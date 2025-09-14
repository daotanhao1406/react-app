
// Pipeline execution result for each stage
export interface StageResult {
  stage: any;
  result: any[];
  error?: string;
}

export interface PipelineExecution {
  stages: StageResult[];
  finalResult: any[];
  isValid: boolean;
  errors: string[];
}

// Execute a single aggregation stage
function executeStage(data: any[], stage: any): any[] {
  try {
    if ('$match' in stage) {
      return executeMatch(data, stage.$match);
    } else if ('$group' in stage) {
      return executeGroup(data, stage.$group);
    } else if ('$project' in stage) {
      return executeProject(data, stage.$project);
    } else if ('$sort' in stage) {
      return executeSort(data, stage.$sort);
    }
    return data;
  } catch (error) {
    console.error('Stage execution error:', error);
    return data;
  }
}

// Execute $match stage
function executeMatch(data: any[], matchCriteria: Record<string, any>): any[] {
  return data.filter(item => {
    return Object.entries(matchCriteria).every(([key, value]) => {
      const itemValue = (item as any)[key];
      
      if (typeof value === 'object' && value !== null) {
        // Handle operators like $gt, $lt, $in, etc.
        return Object.entries(value).every(([operator, operandValue]) => {
          switch (operator) {
            case '$gt': return itemValue > (operandValue as number);
            case '$gte': return itemValue >= (operandValue as number);
            case '$lt': return itemValue < (operandValue as number);
            case '$lte': return itemValue <= (operandValue as number);
            case '$eq': return itemValue === operandValue;
            case '$ne': return itemValue !== operandValue;
            case '$in': return Array.isArray(operandValue) && operandValue.includes(itemValue);
            case '$nin': return Array.isArray(operandValue) && !operandValue.includes(itemValue);
            case '$regex': return new RegExp(operandValue as string).test(String(itemValue));
            default: return itemValue === operandValue;
          }
        });
      }
      
      return itemValue === value;
    });
  });
}

// Execute $group stage
function executeGroup(data: any[], groupSpec: Record<string, any>): any[] {
  const { _id, ...accumulators } = groupSpec;
  const groups = new Map<string, any[]>();
  
  // Group data by _id field
  data.forEach(item => {
    const groupKey = typeof _id === 'string' && _id.startsWith('$') 
      ? String((item as any)[_id.slice(1)]) 
      : String(_id);
    
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(item);
  });
  
  // Apply accumulators to each group
  return Array.from(groups.entries()).map(([groupKey, groupItems]) => {
    const result: any = { _id: groupKey === 'null' ? null : groupKey };
    
    Object.entries(accumulators).forEach(([field, accumulator]) => {
      if (typeof accumulator === 'object' && accumulator !== null) {
        const [[operator, operand]] = Object.entries(accumulator);
        
        switch (operator) {
          case '$sum':
            if (operand === 1) {
              result[field] = groupItems.length;
            } else if (typeof operand === 'string' && operand.startsWith('$')) {
              const fieldName = operand.slice(1);
              result[field] = groupItems.reduce((sum, item) => sum + ((item as any)[fieldName] || 0), 0);
            }
            break;
          case '$avg':
            if (typeof operand === 'string' && operand.startsWith('$')) {
              const fieldName = operand.slice(1);
              const values = groupItems.map(item => (item as any)[fieldName]).filter(v => typeof v === 'number');
              result[field] = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
            }
            break;
          case '$min':
            if (typeof operand === 'string' && operand.startsWith('$')) {
              const fieldName = operand.slice(1);
              const values = groupItems.map(item => (item as any)[fieldName]).filter(v => v !== undefined);
              result[field] = values.length > 0 ? Math.min(...values) : null;
            }
            break;
          case '$max':
            if (typeof operand === 'string' && operand.startsWith('$')) {
              const fieldName = operand.slice(1);
              const values = groupItems.map(item => (item as any)[fieldName]).filter(v => v !== undefined);
              result[field] = values.length > 0 ? Math.max(...values) : null;
            }
            break;
        }
      }
    });
    
    return result;
  });
}

// Execute $project stage
function executeProject(data: any[], projection: Record<string, any>): any[] {
  return data.map(item => {
    const result: any = {};
    
    Object.entries(projection).forEach(([field, value]) => {
      if (value === 1 || value === true) {
        result[field] = (item as any)[field];
      } else if (value === 0 || value === false) {
        // Exclude field (only if no other fields are included)
      } else if (typeof value === 'string' && value.startsWith('$')) {
        result[field] = (item as any)[value.slice(1)];
      } else {
        result[field] = value;
      }
    });
    
    // If no inclusions specified, include all except exclusions
    const hasInclusions = Object.values(projection).some(v => v === 1 || v === true);
    if (!hasInclusions) {
      Object.keys(item).forEach(key => {
        if (!(key in projection) || projection[key] !== 0) {
          result[key] = (item as any)[key];
        }
      });
    }
    
    return result;
  });
}

// Execute $sort stage
function executeSort(data: any[], sortSpec: Record<string, 1 | -1>): any[] {
  return [...data].sort((a, b) => {
    for (const [field, direction] of Object.entries(sortSpec)) {
      const aVal = (a as any)[field];
      const bVal = (b as any)[field];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      if (aVal > bVal) comparison = 1;
      
      if (comparison !== 0) {
        return direction === 1 ? comparison : -comparison;
      }
    }
    return 0;
  });
}

// Execute full pipeline
export function executePipeline(data: any[], pipeline: any) {
  const stages: StageResult[] = [];
  const errors: string[] = [];
  let currentData = [...data];
  let isValid = true;
  
  pipeline.forEach((stage, index) => {
    try {
      const result = executeStage(currentData, stage);
      stages.push({ stage, result });
      currentData = result;
    } catch (error) {
      const errorMessage = `Stage ${index + 1} error: ${error instanceof Error ? error.message : String(error)}`;
      stages.push({ stage, result: currentData, error: errorMessage });
      errors.push(errorMessage);
      isValid = false;
    }
  });
  
  return {
    stages,
    finalResult: currentData,
    isValid,
    errors
  };
}

// Validate pipeline JSON
export function validatePipeline(pipelineJson: string): { isValid: boolean; pipeline?: any; error?: string } {
  try {
    const parsed = JSON.parse(pipelineJson);
    
    if (!Array.isArray(parsed)) {
      return { isValid: false, error: 'Pipeline must be an array' };
    }
    
    // Basic validation - could be enhanced with schema validation
    const pipeline = parsed;
    return { isValid: true, pipeline };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
}
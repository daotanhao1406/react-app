export const STAGE_TEMPLATES = {
  '$match': `/**
 * query: The query in MQL.
 */
{
  "field": "value"
}`,
  '$project': `/**
 * specifications: The fields to include or exclude.
 */
{
  "field1": 1,
  "field2": 0,
  "newField": "$existingField"
}`,
  '$group': `/**
 * _id: The group key expression.
 * fieldN: Accumulator expressions.
 */
{
  "_id": "$groupField",
  "count": { "$sum": 1 },
  "average": { "$avg": "$numericField" }
}`,
  '$sort': `/**
 * Provide the field(s) to sort by and the respective sort order.
 * 1 = ascending, -1 = descending
 */
{
  "field1": 1,
  "field2": -1
}`,
  '$limit': `/**
 * Provide the number of documents to limit.
 */
100`,
  '$skip': `/**
 * Provide the number of documents to skip.
 */
10`,
  '$unwind': `/**
 * path: The array field path to unwind.
 * Optional: preserveNullAndEmptyArrays, includeArrayIndex
 */
{
  "path": "$arrayField",
  "preserveNullAndEmptyArrays": true
}`,
  '$lookup': `/**
 * from: The target collection.
 * localField: The local join field.
 * foreignField: The target join field.
 * as: The name for the result array.
 */
{
  "from": "targetCollection",
  "localField": "localField",
  "foreignField": "foreignField",
  "as": "joinedData"
}`,
  '$addFields': `/**
 * Add new fields or modify existing ones.
 */
{
  "newField": { "$add": ["$field1", "$field2"] },
  "modifiedField": { "$toUpper": "$stringField" }
}`,
  '$replaceRoot': `/**
 * newRoot: The new root document.
 */
{
  "newRoot": "$embeddedField"
}`,
  '$facet': `/**
 * Multiple pipelines within a single stage.
 */
{
  "pipeline1": [
    { "$match": { "field": "value" } }
  ],
  "pipeline2": [
    { "$group": { "_id": "$field", "count": { "$sum": 1 } } }
  ]
}`,
  '$bucket': `/**
 * groupBy: The expression to group by.
 * boundaries: The bucket boundaries.
 * default: The default bucket name.
 * output: The output specification.
 */
{
  "groupBy": "$field",
  "boundaries": [0, 10, 20, 30],
  "default": "Other",
  "output": {
    "count": { "$sum": 1 }
  }
}`,
  '$bucketAuto': `/**
 * groupBy: The expression to group by.
 * buckets: The number of buckets.
 * output: The output specification.
 */
{
  "groupBy": "$field",
  "buckets": 5,
  "output": {
    "count": { "$sum": 1 }
  }
}`,
  '$sortByCount': `/**
 * Sort by count of expression value.
 */
"$field"`,
  '$sample': `/**
 * size: The number of documents to sample.
 */
{
  "size": 10
}`,
  '$unionWith': `/**
 * coll: The collection to union with.
 * pipeline: Optional pipeline to apply.
 */
{
  "coll": "anotherCollection",
  "pipeline": [
    { "$match": { "field": "value" } }
  ]
}`,
  '$densify': `/**
 * field: The field to densify.
 * range: The range specification.
 */
{
  "field": "dateField",
  "range": {
    "step": 1,
    "unit": "day",
    "bounds": "full"
  }
}`,
  '$fill': `/**
 * partitionBy: Optional partition expression.
 * sortBy: Sort specification.
 * output: Fill specifications.
 */
{
  "sortBy": { "date": 1 },
  "output": {
    "field": { "method": "linear" }
  }
}`,
  '$setWindowFields': `/**
 * partitionBy: Optional partition expression.
 * sortBy: Sort specification.
 * output: Window function specifications.
 */
{
  "sortBy": { "date": 1 },
  "output": {
    "runningTotal": {
      "$sum": "$amount",
      "window": {
        "documents": ["unbounded", "current"]
      }
    }
  }
}`,
  '$merge': `/**
 * into: The target collection or database.
 * on: The field(s) to merge on.
 * whenMatched: Action when documents match.
 * whenNotMatched: Action when documents don't match.
 */
{
  "into": "targetCollection",
  "on": "_id",
  "whenMatched": "merge",
  "whenNotMatched": "insert"
}`,
  '$out': `/**
 * Specify the target collection name.
 */
"targetCollection"`
};

export const STAGE_OPTIONS = Object.keys(STAGE_TEMPLATES).map(stage => ({
  value: stage,
  label: stage,
  description: getStageDescription(stage)
}));

function getStageDescription(stage: string): string {
  const descriptions: Record<string, string> = {
    '$match': 'Filters documents',
    '$project': 'Selects/excludes fields',
    '$group': 'Groups documents by expression',
    '$sort': 'Sorts documents',
    '$limit': 'Limits result count',
    '$skip': 'Skips documents',
    '$unwind': 'Deconstructs arrays',
    '$lookup': 'Joins collections',
    '$addFields': 'Adds/modifies fields',
    '$replaceRoot': 'Replaces root document',
    '$facet': 'Multiple parallel pipelines',
    '$bucket': 'Categorizes into buckets',
    '$bucketAuto': 'Auto-categorizes into buckets',
    '$sortByCount': 'Groups and sorts by count',
    '$sample': 'Random sample of documents',
    '$unionWith': 'Combines with another collection',
    '$densify': 'Adds missing data points',
    '$fill': 'Fills missing field values',
    '$setWindowFields': 'Window functions',
    '$merge': 'Merges into target collection',
    '$out': 'Outputs to collection'
  };
  return descriptions[stage] || 'MongoDB aggregation stage';
}

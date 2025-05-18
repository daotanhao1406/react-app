import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../types/category';

let categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    parentId: null,
    level: 0,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Computers',
    description: 'Desktop and laptop computers',
    parentId: '1',
    level: 1,
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '3',
    name: 'Laptops',
    description: 'Portable computers',
    parentId: '2',
    level: 2,
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  }
];

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categories);
  }),

  http.get('/api/categories/:id', ({ params }) => {
    const { id } = params;
    const category = categories.find(c => c.id === id);
    
    if (!category) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(category);
  }),

  http.post('/api/categories', async ({ request }) => {
    const data = await request.json();
    
    const level = data.parentId 
      ? (categories.find(c => c.id === data.parentId)?.level ?? 0) + 1 
      : 0;
    
    const newCategory: Category = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      parentId: data.parentId,
      level,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    categories.push(newCategory);
    return HttpResponse.json(newCategory);
  }),

  http.put('/api/categories/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    let level = categories[index].level;
    if (data.parentId !== undefined && data.parentId !== categories[index].parentId) {
      level = data.parentId 
        ? (categories.find(c => c.id === data.parentId)?.level ?? 0) + 1 
        : 0;
    }
    
    const updatedCategory = {
      ...categories[index],
      ...data,
      level,
      updatedAt: new Date(),
    };
    
    categories[index] = updatedCategory;
    return HttpResponse.json(updatedCategory);
  }),

  http.delete('/api/categories/:id', ({ params }) => {
    const { id } = params;
    const getDescendantIds = (categoryId: string): string[] => {
      const descendants: string[] = [];
      const directChildren = categories.filter(c => c.parentId === categoryId);
      
      directChildren.forEach(child => {
        descendants.push(child.id);
        descendants.push(...getDescendantIds(child.id));
      });
      
      return descendants;
    };
    
    const descendantIds = getDescendantIds(id);
    categories = categories.filter(
      category => category.id !== id && !descendantIds.includes(category.id)
    );
    
    return new HttpResponse(null, { status: 200 });
  }),
];
import { Category, CategoryFormData } from '../types/category';

class CategoryService {
  private baseUrl = '/api/categories';

  async getAll(): Promise<Category[]> {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    return data;
  }

  async getAllAsTree(): Promise<Category[]> {
    const categories = await this.getAll();
    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    categories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    categories.forEach(category => {
      if (category.parentId === null) {
        rootCategories.push(categoryMap.get(category.id)!);
      } else {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(categoryMap.get(category.id)!);
        }
      }
    });

    return rootCategories;
  }

  async getById(id: string): Promise<Category | undefined> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  async create(data: CategoryFormData): Promise<Category> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async update(id: string, data: Partial<CategoryFormData>): Promise<Category | undefined> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) return undefined;
    return response.json();
  }

  async delete(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
}

export const categoryService = new CategoryService();
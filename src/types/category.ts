// export interface Category {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   parentId: string | null;
//   children?: Category[];
//   createdAt: string;
//   createdBy: User;
// }

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId: string | null;
  level: number;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  parentId: string | null;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description: string;
  createdAt: string;
  createdBy: User;
}

export enum EntityType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
  PRODUCT = 'product',
  SERVICE = 'service',
  OTHER = 'other'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
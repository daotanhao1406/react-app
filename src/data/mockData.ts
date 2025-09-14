
// Generate mock users
export const generateMockUsers = () => [
  {
    _id: "user_001",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    age: 28,
    department: "Engineering",
    salary: 85000,
    joinDate: "2022-03-15",
    isActive: true
  },
  {
    _id: "user_002", 
    name: "Bob Smith",
    email: "bob.smith@company.com",
    age: 34,
    department: "Marketing",
    salary: 72000,
    joinDate: "2021-07-20",
    isActive: true
  },
  {
    _id: "user_003",
    name: "Carol Davis", 
    email: "carol.davis@company.com",
    age: 29,
    department: "Engineering",
    salary: 90000,
    joinDate: "2022-01-10",
    isActive: false
  },
  {
    _id: "user_004",
    name: "David Wilson",
    email: "david.wilson@company.com", 
    age: 42,
    department: "Sales",
    salary: 68000,
    joinDate: "2020-11-05",
    isActive: true
  },
  {
    _id: "user_005",
    name: "Eva Brown",
    email: "eva.brown@company.com",
    age: 31,
    department: "Engineering", 
    salary: 95000,
    joinDate: "2021-09-12",
    isActive: true
  },
  {
    _id: "user_006",
    name: "Frank Miller",
    email: "frank.miller@company.com",
    age: 26,
    department: "Marketing",
    salary: 58000,
    joinDate: "2023-02-28",
    isActive: true
  }
];

// Generate mock products
export const generateMockProducts = () => [
  {
    _id: "prod_001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    rating: 4.5,
    tags: ["audio", "wireless", "bluetooth"],
    createdAt: "2023-01-15"
  },
  {
    _id: "prod_002",
    name: "Gaming Laptop",
    category: "Electronics", 
    price: 1299.99,
    stock: 12,
    rating: 4.8,
    tags: ["computer", "gaming", "laptop"],
    createdAt: "2023-02-20"
  },
  {
    _id: "prod_003",
    name: "Coffee Maker",
    category: "Appliances",
    price: 89.99,
    stock: 23,
    rating: 4.2,
    tags: ["kitchen", "coffee", "appliance"],
    createdAt: "2023-03-10"
  },
  {
    _id: "prod_004",
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    stock: 67,
    rating: 4.6,
    tags: ["phone", "mobile", "android"],
    createdAt: "2023-01-25"
  },
  {
    _id: "prod_005",
    name: "Desk Chair",
    category: "Furniture",
    price: 249.99,
    stock: 18,
    rating: 4.3,
    tags: ["office", "chair", "ergonomic"],
    createdAt: "2023-02-05"
  },
  {
    _id: "prod_006",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 34,
    rating: 4.1,
    tags: ["audio", "bluetooth", "portable"],
    createdAt: "2023-03-20"
  }
];

export const MOCK_DATASETS = {
  users: generateMockUsers(),
  products: generateMockProducts()
} as const;

export type DatasetType = keyof typeof MOCK_DATASETS;
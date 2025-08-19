import { Category, Entity, EntityType, User } from '../types/category';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

export const categoryData: Category = {
  id: '1',
  name: 'Electronics',
  description: 'All electronic devices and accessories',
  icon: 'laptop',
  parentId: null,
  createdAt: '2023-05-15T10:30:00Z',
  createdBy: users[0],
  children: [
    {
      id: '2',
      name: 'Computers',
      description: 'Desktop and laptop computers',
      icon: 'desktop',
      parentId: '1',
      createdAt: '2023-05-16T10:30:00Z',
      createdBy: users[1],
      children: [
        {
          id: '5',
          name: 'Laptops',
          description: 'Portable computers',
          icon: 'laptop',
          parentId: '2',
          createdAt: '2023-05-17T10:30:00Z',
          createdBy: users[2],
        },
        {
          id: '6',
          name: 'Desktops',
          description: 'Stationary computers',
          icon: 'desktop',
          parentId: '2',
          createdAt: '2023-05-18T10:30:00Z',
          createdBy: users[3],
        },
      ],
    },
    {
      id: '3',
      name: 'Mobile Devices',
      description: 'Smartphones and tablets',
      icon: 'mobile',
      parentId: '1',
      createdAt: '2023-05-19T10:30:00Z',
      createdBy: users[0],
      children: [
        {
          id: '7',
          name: 'Smartphones',
          description: 'Mobile phones with advanced features',
          icon: 'mobile',
          parentId: '3',
          createdAt: '2023-05-20T10:30:00Z',
          createdBy: users[1],
        },
        {
          id: '8',
          name: 'Tablets',
          description: 'Portable touchscreen devices',
          icon: 'tablet',
          parentId: '3',
          createdAt: '2023-05-21T10:30:00Z',
          createdBy: users[2],
        },
      ],
    },
    {
      id: '4',
      name: 'Accessories',
      description: 'Electronic accessories',
      icon: 'usb',
      parentId: '1',
      createdAt: '2023-05-22T10:30:00Z',
      createdBy: users[3],
      children: [
        {
          id: '9',
          name: 'Cables',
          description: 'Connection cables',
          icon: 'usb',
          parentId: '4',
          createdAt: '2023-05-23T10:30:00Z',
          createdBy: users[0],
        },
        {
          id: '10',
          name: 'Chargers',
          description: 'Power adapters and chargers',
          icon: 'thunderbolt',
          parentId: '4',
          createdAt: '2023-05-24T10:30:00Z',
          createdBy: users[1],
        },
      ],
    },
  ],
};

export const categoryTreeData = [
  {
    title: 'Electronics',
    key: '1',
    children: [
      {
        title: 'Computers',
        key: '2',
        children: [
          { title: 'Laptops', key: '5' },
          { title: 'Desktops', key: '6' },
        ],
      },
      {
        title: 'Mobile Devices',
        key: '3',
        children: [
          { title: 'Smartphones', key: '7' },
          { title: 'Tablets', key: '8' },
        ],
      },
      {
        title: 'Accessories',
        key: '4',
        children: [
          { title: 'Cables', key: '9' },
          { title: 'Chargers', key: '10' },
        ],
      },
    ],
  },
];

export const relatedEntities: Entity[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    type: EntityType.PRODUCT,
    description: 'High-performance laptop for professionals',
    createdAt: '2023-05-15T10:30:00Z',
    createdBy: users[0],
  },
  {
    id: '2',
    name: 'Laptop Buying Guide',
    type: EntityType.DOCUMENT,
    description: 'Comprehensive guide to buying laptops',
    createdAt: '2023-06-20T14:15:00Z',
    createdBy: users[1],
  },
  {
    id: '3',
    name: 'Dell XPS 13',
    type: EntityType.PRODUCT,
    description: 'Premium ultrabook with InfinityEdge display',
    createdAt: '2023-07-05T09:45:00Z',
    createdBy: users[2],
  },
  {
    id: '4',
    name: 'Laptop Maintenance Tips',
    type: EntityType.DOCUMENT,
    description: 'Tips for maintaining your laptop',
    createdAt: '2023-08-10T11:20:00Z',
    createdBy: users[3],
  },
  {
    id: '5',
    name: 'ASUS ROG Gaming Laptop',
    type: EntityType.PRODUCT,
    description: 'High-performance gaming laptop',
    createdAt: '2023-09-25T16:30:00Z',
    createdBy: users[0],
  },
  {
    id: '6',
    name: 'Laptop Unboxing',
    type: EntityType.VIDEO,
    description: 'Video showing laptop unboxing experience',
    createdAt: '2023-10-12T13:10:00Z',
    createdBy: users[1],
  },
  {
    id: '7',
    name: 'Laptop Schematics',
    type: EntityType.IMAGE,
    description: 'Technical schematics of laptop components',
    createdAt: '2023-11-05T08:55:00Z',
    createdBy: users[2],
  },
  {
    id: '8',
    name: 'Laptop Repair Service',
    type: EntityType.SERVICE,
    description: 'Professional laptop repair and maintenance service',
    createdAt: '2023-12-18T15:40:00Z',
    createdBy: users[3],
  },
];

export const servers = [
  {
    name: "NEXUS-ALPHA",
    ip: "192.168.1.100",
    country: "United States",
    countryCode: "us",
    latency: 12,
    isOnline: true,
  },
  {
    name: "MATRIX-BETA",
    ip: "10.0.0.55",
    country: "Japan",
    countryCode: "jp",
    latency: 8,
    isOnline: true,
  },
  {
    name: "ZENITH-GAMMA",
    ip: "172.16.0.89",
    country: "Germany",
    countryCode: "de",
    latency: 15,
    isOnline: true,
  },
  {
    name: "AURORA-DELTA",
    ip: "203.0.113.42",
    country: "Australia",
    countryCode: "au",
    latency: 45,
    isOnline: true,
  },
  {
    name: "PHOENIX-ECHO",
    ip: "198.51.100.21",
    country: "Canada",
    countryCode: "ca",
    latency: 18,
    isOnline: true,
  },
  {
    name: "CIPHER-FOXTROT",
    ip: "51.15.128.77",
    country: "France",
    countryCode: "fr",
    latency: 22,
    isOnline: true,
  },
  {
    name: "VERTEX-GOLF",
    ip: "139.162.45.193",
    country: "Singapore",
    countryCode: "sg",
    latency: 35,
    isOnline: true,
  },
  {
    name: "QUANTUM-HOTEL",
    ip: "85.204.76.44",
    country: "Brazil",
    countryCode: "br",
    latency: null,
    isOnline: false,
  },
];

// Add IDs to servers for compatibility
export const serversWithIds = servers.map((server, index) => ({
  ...server,
  id: `server-${index + 1}`,
}));
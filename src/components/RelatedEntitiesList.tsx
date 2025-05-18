import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Typography, 
  Tag, 
  Input, 
  Space, 
  Avatar, 
  Select, 
  Tooltip,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined
} from '@ant-design/icons';
import { Entity, EntityType } from '../types/category';
import EntityTypeIcon from './EntityTypeIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title } = Typography;
const { Option } = Select;

interface RelatedEntitiesListProps {
  entities: Entity[];
}

const RelatedEntitiesList: React.FC<RelatedEntitiesListProps> = ({ entities }) => {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredEntities = entities.filter(entity => {
    const matchesSearch = 
      !searchText || 
      entity.name.toLowerCase().includes(searchText.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesType = !filterType || entity.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  const getTypeColor = (type: EntityType) => {
    const colorMap: Record<EntityType, string> = {
      [EntityType.DOCUMENT]: 'blue',
      [EntityType.IMAGE]: 'green',
      [EntityType.VIDEO]: 'orange',
      [EntityType.PRODUCT]: 'purple',
      [EntityType.SERVICE]: 'cyan',
      [EntityType.OTHER]: 'default',
    };
    
    return colorMap[type];
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Entity, b: Entity) => a.name.localeCompare(b.name),
      render: (text: string, record: Entity) => (
        <Space>
          <Badge 
            count={<EntityTypeIcon type={record.type} />} 
            offset={[-2, 2]}
          >
            <span className="font-medium text-gray-800 mr-3">{text}</span>
          </Badge>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: EntityType) => (
        <Tag color={getTypeColor(type)} className="capitalize">
          {type}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: (text: string) => (
        <span className="text-gray-600 line-clamp-2">{text}</span>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: (a: Entity, b: Entity) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => (
        <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          <span className="text-gray-500">{dayjs(date).fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
      render: (user: { name: string; avatar: string }) => (
        <Space>
          <Avatar src={user.avatar} size="small" />
          <span>{user.name}</span>
        </Space>
      ),
    }
  ];

  return (
    <Card
      title={<Title level={4} className="mb-0">Related Entities</Title>}
      bordered={false}
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px' }}
      className="related-entities-card"
    >
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search entities"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1"
          allowClear
        />
        
        <Space>
          <Select
            placeholder="Filter by type"
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setFilterType(value)}
            suffixIcon={<FilterOutlined />}
          >
            {Object.values(EntityType).map((type) => (
              <Option key={type} value={type}>
                <Space>
                  <EntityTypeIcon type={type as EntityType} />
                  <span className="capitalize">{type}</span>
                </Space>
              </Option>
            ))}
          </Select>
        </Space>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredEntities}
        rowKey="id"
        pagination={{ 
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        className="related-entities-table"
      />
    </Card>
  );
};

export default RelatedEntitiesList;
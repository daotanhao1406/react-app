import React, { useState } from 'react';
import { Layout, Modal, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetCard from './components/WidgetCard';
import AddWidgetCard from './components/AddWidgetCard';
import { Widget } from './types/widget';

const { Header, Content } = Layout;

const initialWidgets: Widget[] = [
  {
    id: '1',
    title: 'Widget 1',
    content: 'This is the content for Widget 1',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
  },
  {
    id: '2',
    title: 'Widget 2',
    content: 'This is the content for Widget 2',
    x: 4,
    y: 0,
    w: 4,
    h: 2,
  },
  {
    id: '3',
    title: 'Widget 3',
    content: 'This is the content for Widget 3',
    x: 8,
    y: 0,
    w: 4,
    h: 2,
  },
];

const App: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [form] = Form.useForm();

  const onLayoutChange = (layout: GridLayout.Layout[]) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((item) => item.i === widget.id);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  const handleAddWidget = (values: { title: string; content: string }) => {
    const newWidget: Widget = {
      id: String(Date.now()),
      title: values.title,
      content: values.content,
      x: (widgets.length * 4) % 12,
      y: Math.floor((widgets.length * 4) / 12) * 2,
      w: 4,
      h: 2,
    };

    setWidgets([...widgets, newWidget]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEditWidget = (values: { title: string; content: string }) => {
    if (editingWidget) {
      const updatedWidgets = widgets.map((widget) =>
        widget.id === editingWidget.id
          ? { ...widget, title: values.title, content: values.content }
          : widget
      );
      setWidgets(updatedWidgets);
      setEditingWidget(null);
      form.resetFields();
    }
  };

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== widgetId));
  };

  const maxY = widgets.reduce((max, widget) => {
    return Math.max(max, widget.y + widget.h);
  }, 0);

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white px-6 flex items-center">
        <h1 className="text-2xl font-bold">Widget Dashboard</h1>
      </Header>
      <Content className="p-6">
        <GridLayout
          className="layout"
          layout={[
            ...widgets.map(({ id, x, y, w, h }) => ({ i: id, x, y, w, h })),
            { i: 'add-widget', x: 0, y: maxY, w: 4, h: 2, static: true }
          ]}
          cols={12}
          rowHeight={150}
          width={1200}
          onLayoutChange={onLayoutChange}
          draggableHandle=".ant-card-head"
        >
          {widgets.map((widget) => (
            <div key={widget.id}>
              <WidgetCard
                widget={widget}
                onEdit={(widget) => {
                  setEditingWidget(widget);
                  form.setFieldsValue({
                    title: widget.title,
                    content: widget.content,
                  });
                }}
                onDelete={handleDeleteWidget}
              />
            </div>
          ))}
          <div key="add-widget">
            <AddWidgetCard onClick={() => setIsModalVisible(true)} />
          </div>
        </GridLayout>

        <Modal
          title={editingWidget ? "Edit Widget" : "Add New Widget"}
          open={isModalVisible || editingWidget !== null}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingWidget(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingWidget ? handleEditWidget : handleAddWidget}
          >
            <Form.Item
              name="title"
              label="Widget Title"
              rules={[{ required: true, message: 'Please input widget title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="Widget Content"
              rules={[{ required: true, message: 'Please input widget content!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingWidget ? 'Save Changes' : 'Add Widget'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;
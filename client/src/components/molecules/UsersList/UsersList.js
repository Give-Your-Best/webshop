import * as React from "react";
import { Table, Space } from 'antd';
import { ListWrapper } from './UsersList.styles';

export const UsersList = (data) => {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <span onClick={() => data.handleDelete(record._id)}>Delete</span>
        </Space>
      ),
    },
  ]

  return (
    <ListWrapper>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: record => <div><p style={{ margin: 0 }}>Username: {record.username}</p><p style={{ margin: 0 }}>Email: {record.email}</p></div>
        }}
        dataSource={data.data}
      />
    </ListWrapper>
  );
};

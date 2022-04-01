import React from 'react';
import { Table, Space } from 'antd';
import { ListWrapper } from './UsersList.styles';

export const UsersList = (data) => {

  var columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
  ]

  if (data.handleDelete) {
    columns.push({
        title: 'Action',
        key: 'action',
        render: (record) => (
          <Space size="middle">
            <span onClick={() => data.handleDelete(record._id, record.kind)}>Delete</span>
          </Space>
        )
    })
  }

  return (
    <ListWrapper>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow
        }}
        dataSource={data.data}
      />
    </ListWrapper>
  );
};

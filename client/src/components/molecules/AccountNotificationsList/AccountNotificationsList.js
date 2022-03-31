import React from 'react';
import { Table } from 'antd';
import { ListWrapper } from './AccountNotificationsList.styles';

export const AccountNotificationsList = (data) => {

  const columns = [
    {
      title: '',
      dataIndex: 'name'
    },
    {
      title: '',
      dataIndex: 'message'
    },
    {
      title: '',
      dataIndex: 'itemsCount',
      render: (value) => {
        return value + ' items'
      }
    }
  ]

  return (
    <ListWrapper>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: data.expandRow
        }}
        dataSource={data.data}
      />
    </ListWrapper>
  );
};

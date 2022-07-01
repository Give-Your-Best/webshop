import React from 'react';
import { Space } from 'antd';
import { ListWrapper, ExpandButton, StyledTable, DeleteButton } from './UsersList.styles';

export const UsersList = (data) => {

  var columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ]

  if (data.handleDelete) {
    columns.push({
        title: 'Action',
        key: 'action',
        width: 20,
        render: (record) => (
          <Space size="middle">
            <DeleteButton onClick={() => data.handleDelete(record._id, record.kind)}>Delete</DeleteButton>
          </Space>
        )
    })
  }

  return (
    <ListWrapper>
      <StyledTable
        pagination={{hideOnSinglePage: true}}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 2,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data.data}
      />
    </ListWrapper>
  );
};

import React from "react";
import { Space } from 'antd';
import { ListWrapper, StyledTable, ExpandButton, DeleteButton } from './ItemsCollapsedList.styles';

export const ItemsCollapsedList = (data) => {

  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Approved Status',
      dataIndex: 'approvedStatus',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <DeleteButton onClick={() => data.handleDelete(record._id)}>Delete</DeleteButton>
        </Space>
      )
    }
  ]

  return (
    <ListWrapper>
      <StyledTable
        pagination={{hideOnSinglePage: true}}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record._id || 0}
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

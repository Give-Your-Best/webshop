import React from "react";
import { Space } from 'antd';
import { Button } from "../../atoms";
import { ListWrapper, StyledTable, ExpandButton, DeleteButton } from './ItemsCollapsedList.styles';

export const ItemsCollapsedList = ({data, handleDelete, expandRow, reOpen}) => {

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
    }
  ]

  if (handleDelete) {
    columns.push({
        title: 'Action',
        key: 'action',
        width: 20,
        render: (record) => (
          <Space size="middle">
            <DeleteButton onClick={() => handleDelete(record._id, record.kind)}>Delete</DeleteButton>
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
        rowKey={(record) => record._id || 0}
        expandable={{
          expandedRowRender: expandRow,
          expandIconColumnIndex: 2,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data}
      />
      {(reOpen) ? <Button onClick={reOpen} small primary>Back to Current Items</Button>: ''}
    </ListWrapper>
  );
};

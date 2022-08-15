import React from 'react';
import { ListWrapper, StyledTable, ExpandButton, DeleteButton } from './TagsLists.styles';
import { Space } from 'antd';

export const TagsList = ({data, handleDelete, expandRow}) => {

  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <DeleteButton onClick={() => handleDelete(record._id, record.kind)}>Delete</DeleteButton>
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
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: expandRow,
          expandIconColumnIndex: 1,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data}
      />
    </ListWrapper>
  );
};

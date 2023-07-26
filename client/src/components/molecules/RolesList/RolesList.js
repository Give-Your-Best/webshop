import React from 'react';
import { ListWrapper, StyledTable, ExpandButton } from './RolesList.styles';

export const RolesList = (data) => {
  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
  ];

  return (
    <ListWrapper>
      <StyledTable
        pagination={{ hideOnSinglePage: true }}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 2,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <ExpandButton onClick={(e) => onExpand(record, e)}>
                Close
              </ExpandButton>
            ) : (
              <ExpandButton onClick={(e) => onExpand(record, e)}>
                View
              </ExpandButton>
            ),
        }}
        dataSource={data.data}
      />
    </ListWrapper>
  );
};

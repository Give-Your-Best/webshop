import React from 'react';
import { ListWrapper, ExpandButton, StyledTable } from './AccountNotificationsList.styles';

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
      <StyledTable
        pagination={{hideOnSinglePage: true}}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 4,
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

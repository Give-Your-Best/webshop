import React from 'react';
import {
  ListWrapper,
  ExpandButton,
  StyledTable,
} from './ShopNotificationsList.styles';

export const ShopNotificationsList = (data) => {
  const columns = [
    {
      title: '',
      dataIndex: 'name',
    },
    {
      title: '',
      dataIndex: 'message',
    },
    {
      title: '',
      dataIndex: 'itemsCount',
      render: (value) => {
        return value + ' items';
      },
    },
  ];

  return (
    <ListWrapper>
      <StyledTable
        pagination={{ hideOnSinglePage: true }}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record.key}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 3,
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

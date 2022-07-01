import React from 'react';
import { Space } from 'antd';
import { ListWrapper, ExpandButton, StyledTable, DeleteButton, Note } from './MessagesList.styles';
import { checkUnread, name } from '../../../utils/helpers';

export const MessagesList = (data) => {

  const getName = (value) => {
    let result = '';
    if (data.type !== 'admin') {
      result = 'GYB administrator';
    } else {
      result = name(value);
    }
    return result;
  }

  var columns = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (value) => {
        return getName(value)
      }
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Message count',
      dataIndex: 'messages',
      key: 'messages',
      render: (value) => {
        return value.length
      }
    },
    {
      title: 'Unread',
      dataIndex: 'messages',
      key: 'messages',
      render: (value) => {
        return <Note>{(checkUnread(data.type, data.userId, value)[0] > 0)? checkUnread(data.type, data.userId, value)[0] + ' new': ''}</Note>
      }
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

import React, { useState } from "react";
import { Space } from 'antd';
import { Button } from '../../atoms';
import { ListWrapper, StyledTable, ExpandButton, DeleteButton } from './ShippingLocationsList.styles';

export const ShippingLocationsList = (data) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Location',
      dataIndex: 'firstLine',
      className: 'hideOnMobile',
      sorter: (a, b) => a.firstLine.length - b.firstLine.length,
    },
    {
      title: 'No. items',
      dataIndex: 'items',
      render: (c) => {
        return (!c)? 'no current items': c + ' current items'
      }
    },
    {
      title: 'Availability',
      dataIndex: 'available',
      render: (item) => {
        return (item)? 'Available': 'Unavailable'
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 20,
      render: (record) => (
        <Space size="middle">
          <DeleteButton onClick={() => data.handleDelete(record._id, record.kind)}>Delete</DeleteButton>
        </Space>
      )
    }
  ]

  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys( selectedRowKeys );
    }
  };

  return (
    <ListWrapper>
      <StyledTable
        rowSelection={rowSelection}
        pagination={{hideOnSinglePage: true}}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 5,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data.data}
      />
      
      <Button primary small onClick={data.addNew}>Add New</Button>
      <Button primary small onClick={() => {data.editLocation(selectedRowKeys, 'available')}} disabled={!hasSelected}>Mark as Available</Button>
      <Button primary small onClick={() => {data.editLocation(selectedRowKeys, 'un-available')}} disabled={!hasSelected}>Mark as Unavailable</Button>
    </ListWrapper>
  );
};

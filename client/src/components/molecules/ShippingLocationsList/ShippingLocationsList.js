import React, { useState } from "react";
import { Space } from 'antd';
import { Button } from '../../atoms';
import { ListWrapper, StyledTable, ExpandButton } from './ShippingLocationsList.styles';

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
      sorter: (a, b) => a.firstLine.length - b.firstLine.length,
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
      render: (record) => (
        <Space size="middle">
          <span onClick={() => data.handleDelete(record._id, record.kind)}>Delete</span>
        </Space>
      )
    }
  ]

  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      console.log(selectedRowKeys)
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
          expandIconColumnIndex: 3,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data.data}
      />
      <Button small onClick={data.addNew}>Add New</Button>
      <Button small onClick={() => {data.editLocation(selectedRowKeys, 'available')}} disabled={!hasSelected}>Mark as Available</Button>
      <Button small onClick={() => {data.editLocation(selectedRowKeys, 'un-available')}} disabled={!hasSelected}>Mark as Unavailable</Button>
    </ListWrapper>
  );
};

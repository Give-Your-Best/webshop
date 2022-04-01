import React, { useState } from "react";
import { Table, Space } from 'antd';
import { Button } from '../../atoms';
import { ListWrapper } from './ShippingLocationsList.styles';

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
      <Table
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow
        }}
        dataSource={data.data}
      />
      <Button small onClick={data.addNew}>Add New</Button>
      <Button small onClick={() => {data.editLocation(selectedRowKeys, 'available')}} disabled={!hasSelected}>Mark as Available</Button>
      <Button small onClick={() => {data.editLocation(selectedRowKeys, 'un-available')}} disabled={!hasSelected}>Mark as Unavailable</Button>
    </ListWrapper>
  );
};

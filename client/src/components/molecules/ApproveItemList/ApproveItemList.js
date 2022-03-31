import React, { useState } from "react";
import { Table } from 'antd';
import { ListWrapper } from './ApproveItemList.styles';
import { Button } from '../../atoms';

export const ApproveItemList = (data) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'Donor',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Items count',
      dataIndex: 'numOfDonationItems',
      sorter: (a, b) => a.numOfDonationItems.length - b.numOfDonationItems.length,
      render: (value) => {
        return value + ' new items'
      }
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

  const markAsTrusted = () => {
    console.log('mark as trusted')
    console.log(selectedRowKeys)
    data.markAsTrusted(selectedRowKeys);
    setSelectedRowKeys([]);
  }

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
      <Button small onClick={markAsTrusted} disabled={!hasSelected}>Mark as Trusted Donor</Button>
    </ListWrapper>
  );
};

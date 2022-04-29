import React, { useState } from "react";
import { ListWrapper, StyledTable, ExpandButton } from './ApproveItemList.styles';
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
      <Button small onClick={markAsTrusted} disabled={!hasSelected}>Mark as Trusted Donor</Button>
    </ListWrapper>
  );
};

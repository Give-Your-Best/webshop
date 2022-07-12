import React from "react";
import { Space } from 'antd';
import { Button } from "../../atoms";
import { ListWrapper, StyledTable, ExpandButton, DeleteButton } from './ItemsCollapsedList.styles';
import { categories } from '../../../utils/constants';

export const ItemsCollapsedList = ({data, handleDelete, expandRow, reOpen, admin}) => {

  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ]

  if (!admin) {
    columns.push({
      title:'Approved Status',
      key: 'approvedStatus'
    })
  }


  if (admin) {
    columns.push({
      title:'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      filters: categories.map((c) => { return {text: c.name, value: c.id}}),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
    })
  }

  if (handleDelete) {
    columns.push({
        title: '',
        key: 'action',
        width: 20,
        render: (record) => (
          <Space size="middle">
            <DeleteButton onClick={() => handleDelete(record._id, record.kind)}>Delete</DeleteButton>
          </Space>
        )
    })
  }

  return (
    <ListWrapper>
      <StyledTable
        pagination={{hideOnSinglePage: true}}
        columns={columns}
        rowKey={(record) => record._id || 0}
        showHeader={ (!admin)? false: true}
        expandable={{
          expandedRowRender: expandRow,
          expandIconColumnIndex: 2,
          expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
                <ExpandButton onClick={e => onExpand(record, e)}>Close</ExpandButton>
              ) : (
                <ExpandButton onClick={e => onExpand(record, e)}>View</ExpandButton>
              )
          }}
        dataSource={data}
      />
      {(reOpen) ? <Button onClick={reOpen} small primary>Back to Current Items</Button>: ''}
    </ListWrapper>
  );
};

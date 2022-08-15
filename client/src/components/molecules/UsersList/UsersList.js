import React, { useRef } from 'react';
import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ListWrapper, ExpandButton, StyledTable, DeleteButton } from './UsersList.styles';
import { name } from '../../../utils/helpers';

export const UsersList = ({data, handleDelete, expandRow, allTags }) => {

  const searchInput = useRef(null);

  const rows = data.map((d) => {
    return {
      ...d,
      name: name(d)
    };
  })
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters({closeDropDown: true, confirm: true});
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (text)
  });

  var columns = [
    {
      title: 'Name',
      key: 'name',
      className: 'fixedOnMobile',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (record) => {
        return name(record)
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'fixedOnMobile',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps('email'),
    }
  ]

    //additional tag column if shopper and donor list
    if (allTags) {
      columns.push({
        title: 'Tags',
        dataIndex: 'tags',
        render: (record) => {
            return record.map((r) => { 
              return <span>r.name</span>
            }).join();
        },
        className: 'onlyHeading',
        filters: allTags.map((c) => { return { text: c.name, value: c._id } }),
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.tags.some(t=>t._id === value)
      })
    }

  if (handleDelete) {
    columns.push({
        title: '',
        key: 'action',
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
        showHeader={true}
        scroll={{ x: '100%' }}
        columns={columns}
        rowKey={(record) => record._id}
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
        dataSource={rows}
      />
    </ListWrapper>
  );
};

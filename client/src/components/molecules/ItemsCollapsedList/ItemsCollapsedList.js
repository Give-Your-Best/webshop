import React, { useRef, useState } from 'react';
import { Input, Space, Button as AntButton, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../atoms';
import {
  ListWrapper,
  StyledTable,
  ExpandButton,
  DeleteButton,
} from './ItemsCollapsedList.styles';
import { categories } from '../../../utils/constants';
import { name } from '../../../utils/helpers';
import { adminAllItemStatus } from '../../atoms/ProgressBar/constants';

export const ItemsCollapsedList = ({
  data,
  total,
  current,
  onChange: handleChange,
  handleDelete,
  expandRow,
  reOpen,
  admin,
  allTags,
  editItemLiveStatus,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //functions for the name search
  const searchInput = useRef(null);

  let rows = data;

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters({ closeDropDown: true, confirm: true });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <AntButton
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
          >
            Search
          </AntButton>
          <AntButton onClick={() => handleReset(clearFilters)}>Reset</AntButton>
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
    render: (text) => text,
  });

  //table columns
  var columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
  ];

  if (!admin) {
    columns.push({
      title: 'Approved Status',
      dataIndex: 'approvedStatus',
      key: 'approvedStatus',
      render: (record) => {
        let value = record === 'in-progress' ? 'Awaiting approval' : '';
        return value;
      },
    });
    columns.push({
      title: 'Live',
      dataIndex: 'live',
      key: 'live',
      render: (record) => {
        let value = record === false ? 'Inactive' : 'Active';
        return value;
      },
    });
  }

  //additional columns if admin

  if (admin) {
    //map shopper and donor name onto the result as antd table search does not work otherwise
    rows = data.map((d) => {
      return {
        ...d,
        shopper: name(d.shopperId),
        donor: name(d.donorId),
      };
    });

    columns.push({
      title: 'Category',
      dataIndex: 'category',
      className: 'fixedOnMobileSmall',
      sorter: (a, b) => a.category.localeCompare(b.category),
      filters: categories.map((c) => {
        return { text: c.name, value: c.id };
      }),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
    });
    columns.push({
      title: 'Status',
      dataIndex: 'status',
      className: 'fixedOnMobileSmall',
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: adminAllItemStatus.map((c) => {
        return { text: c.statusText, value: c.status };
      }),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
      render: (record) => {
        let value = adminAllItemStatus.find((x) => x.status === record);
        return value.statusText;
      },
    });
    columns.push({
      title: 'Donor',
      dataIndex: 'donor',
      render: (record) => {
        return name(record);
      },
      ...getColumnSearchProps('donor'),
    });
    columns.push({
      title: 'Shopper',
      dataIndex: 'shopper',
      render: (record) => {
        return name(record);
      },
      ...getColumnSearchProps('shopper'),
    });
    columns.push({
      title: 'Tags',
      dataIndex: 'tags',
      render: (record) => {
        return record
          .map((r) => {
            return <span>r.name</span>;
          })
          .join();
      },
      className: 'onlyHeading',
      filters: allTags.map((c) => {
        return { text: c.name, value: c._id };
      }),
      filterMode: 'tree',
      onFilter: (value, record) => record.tags.some((t) => t._id === value),
    });
  }

  if (handleDelete) {
    columns.push({
      title: '',
      key: 'action',
      width: 20,
      render: (record) => (
        <Space size="middle">
          <DeleteButton onClick={() => handleDelete(record._id, record.kind)}>
            Delete
          </DeleteButton>
        </Space>
      ),
    });
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <ListWrapper>
      <StyledTable
        rowSelection={!admin ? rowSelection : false}
        // TODO might want to put a conditional in here to set pagination props
        // different if we are not in the admin view??
        pagination={{
          total,
          current,
          onChange: handleChange,
          position: ['topRight'],
          showSizeChanger: false,
          hideOnSinglePage: false,
        }}
        columns={columns}
        rowKey={(record) => record._id || 0}
        showHeader={!admin ? false : true}
        expandable={{
          expandedRowRender: expandRow,
          expandIconColumnIndex: !admin ? 4 : 6,
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
        dataSource={rows}
      />
      {reOpen ? (
        <Button onClick={reOpen} small primary>
          Back to Current Items
        </Button>
      ) : (
        ''
      )}

      {!admin && !reOpen ? (
        <Tooltip title="Select items to activate in shop">
          <Button
            primary
            small
            onClick={() => {
              editItemLiveStatus(selectedRowKeys, true);
            }}
          >
            Mark as Active
          </Button>
        </Tooltip>
      ) : (
        ''
      )}

      {!admin && !reOpen ? (
        <Tooltip title="Select items to remove from shop">
          <Button
            primary
            small
            onClick={() => {
              editItemLiveStatus(selectedRowKeys, false);
            }}
          >
            Mark as Inactive
          </Button>
        </Tooltip>
      ) : (
        ''
      )}
    </ListWrapper>
  );
};

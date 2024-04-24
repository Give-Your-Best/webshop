import React, { useRef } from 'react';
import { Input, Space, Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  ListWrapper,
  ExpandButton,
  StyledTable,
  DeleteButton,
  ToggleButton,
  Note,
} from './MessagesList.styles';
import { checkUnread, name } from '../../../utils/helpers';

export const MessagesList = (data) => {
  const searchInput = useRef(null);
  const { confirm } = Modal;

  const getName = (value) => {
    let result = '';
    if (data.type !== 'admin') {
      result = 'GYB admin';
    } else if (value != null) {
      result = name(value);
    }
    return result;
  };

  //map name onto the result as antd table search does not work otherwise
  const rows = data.data.map((d) => {
    return {
      ...d,
      name: getName(d.user),
    };
  });

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
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)}>Reset</Button>
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

  var columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      width: 200,
      render: (value) => {
        return getName(value);
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      className: 'hideOnMobile',
      key: 'subject',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: '',
      dataIndex: 'messages',
      key: 'messages',
      render: (value = []) => {
        return value.length;
      },
    },
    {
      title: '',
      dataIndex: 'messages',
      key: 'messages',
      render: (value = []) => {
        return (
          <Note>
            {checkUnread(data.type, data.userId, value)[0] > 0
              ? checkUnread(data.type, data.userId, value)[0] + ' new'
              : ''}
          </Note>
        );
      },
    },
  ];

  if (data.type === 'admin' && data.actions) {
    columns.push({
      title: 'Action',
      key: 'action',
      width: 20,
      render: ({ archived, threadId }) => {
        const { actions } = data;

        return archived ? (
          <Space size="middle">
            <ToggleButton onClick={() => actions.handleRestore(threadId)}>
              Restore
            </ToggleButton>
            <DeleteButton
              onClick={() => {
                confirm({
                  title:
                    'Are you sure you want to delete this thread? It cannot be undone!',
                  className: 'modalStyle',
                  onOk() {
                    actions.handleDelete(threadId);
                  },
                });
              }}
            >
              Delete
            </DeleteButton>
          </Space>
        ) : (
          <Space size="middle">
            <ToggleButton onClick={() => actions.handleArchive(threadId)}>
              Archive
            </ToggleButton>
          </Space>
        );
      },
    });
  }

  return (
    <ListWrapper>
      <StyledTable
        pagination={{ hideOnSinglePage: true }}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: data.expandRow,
          expandIconColumnIndex: 4,
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
    </ListWrapper>
  );
};

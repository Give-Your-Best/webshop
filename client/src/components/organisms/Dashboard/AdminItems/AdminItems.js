import React, { useCallback, useContext, useState, useEffect } from 'react';
import { AutoComplete, Menu, Modal, Select, Space } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import { ItemCardLong, ItemsCollapsedList } from '../../../molecules';
import { getAdminItems, deleteItem } from '../../../../services/items';
import { tabList } from '../../../../utils/helpers';
import { categories } from '../../../../utils/constants';
import { adminAllItemStatus } from '../../../atoms/ProgressBar/constants';

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const { allTags, allUsers } = useContext(AccountContext);
  const [items, setItems] = useState([]);
  const [view, setView] = useState('current');
  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [conditions, setConditions] = useState([]);
  const [sortBy, setSortBy] = useState(undefined);

  // Transform the users data from context to a formatted autocomplete options
  // list with all admins excluded...
  const publicUserOptions = (allUsers || []).reduce((acc, cur) => {
    cur.type !== 'admin' &&
      acc.push({
        label: cur.name,
        value: cur.id,
        type: cur.type,
      });

    return acc;
  }, []);

  // Set this constant for now - we might want to allow adjustment later
  const limit = 10;

  const { confirm } = Modal;

  const fetchItems = useCallback(async () => {
    const { type, value } = currentUser;
    const donorId = type === 'donor' ? value : undefined;
    const shopperId = type === 'shopper' ? value : undefined;

    const { category, status } = conditions.reduce(
      (acc, cur) => {
        const [k, v] = cur.split(':');
        acc[k] = acc[k] || [];
        acc[k].push(v);
        return acc;
      },
      {
        category: undefined,
        status: undefined,
      }
    );

    const { count, items } = await getAdminItems({
      isCurrent: view === 'current',
      withCount: currentPage === 1,
      page: currentPage,
      limit,
      donorId,
      shopperId,
      category,
      status,
      sortBy,
    });

    setItems(items);
    count && setItemsCount(count);
  }, [conditions, currentPage, currentUser, sortBy, view]);

  useEffect(fetchItems, [
    token,
    user,
    view,
    currentPage,
    currentUser,
    fetchItems,
  ]);

  useEffect(() => {
    var tabs = tabList(user);

    tabs.forEach((t) => {
      let url = '/dashboard/' + t.id;
      if (t.id === 'adminItems' && window.location !== 'url') {
        window.history.pushState({}, '', url);
      }
    });
  }, [token, user]);

  const handleSelectUser = (_value, option) => {
    setCurrentPage(1);
    setCurrentUser(option);
  };

  const handleClearUser = () => {
    setCurrentPage(1);
    setCurrentUser({});
  };

  const handleFilterOptions = (inputValue, option) => {
    const re = new RegExp(inputValue, 'i');
    return re.test(option.label);
  };

  const handleSelectView = (view) => {
    setSortBy(undefined);
    setConditions([]);
    setCurrentPage(1);
    setView(view);
  };

  const handleSelectFilter = (e) => {
    setConditions(
      conditions.includes(e.key)
        ? conditions.filter((i) => i !== e.key)
        : [...conditions, e.key]
    );
    setCurrentPage(1);
  };

  const handleTableChange = (data) => {
    const { current, field, order } = data;

    setCurrentPage(current);

    if (order === undefined) {
      setSortBy(undefined);
    } else {
      setSortBy(`${field}:${order}`);
    }
  };

  const handleDeleteItem = (id) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: 'modalStyle',
      onOk() {
        deleteItem(id, token).then(fetchItems);
      },
    });
  };

  const editForm = (record) => {
    return (
      <div key={record._id}>
        <ItemCardLong item={record} type="all" allTags={allTags} />
      </div>
    );
  };

  return (
    <>
      <Space>
        <Select
          size="large"
          style={{ width: 150 }}
          value={view}
          placeholder="Items View"
          defaultValue="current"
          onSelect={handleSelectView}
          options={[
            {
              label: 'Current Items',
              value: 'current',
            },
            {
              label: 'Past Items',
              value: 'past',
            },
          ]}
        />

        <AutoComplete
          value={(currentUser || {}).label}
          options={publicUserOptions}
          style={{ width: 300 }}
          size="large"
          onClear={handleClearUser}
          onSelect={handleSelectUser}
          filterOption={handleFilterOptions}
          placeholder="Shopper or Donor"
          allowClear
        />

        <Menu
          triggerSubMenuAction="click"
          onClick={handleSelectFilter}
          selectedKeys={conditions}
          multiple
          mode="horizontal"
          items={[
            {
              label: 'Category',
              key: 'category',
              children: categories.map((c) => ({
                label: c.name,
                key: `category:${c.id}`,
              })),
            },
          ]}
        />

        <Menu
          triggerSubMenuAction="click"
          onClick={handleSelectFilter}
          selectedKeys={conditions}
          multiple
          mode="horizontal"
          items={[
            {
              label: 'Status',
              key: 'status',
              children: adminAllItemStatus.map((s) => ({
                label: s.statusText,
                key: `status:${s.status}`,
                disabled: view === 'past' || s.status === 'received',
              })),
            },
          ]}
        />
      </Space>

      <ItemsCollapsedList
        data={items}
        total={itemsCount}
        current={currentPage}
        expandRow={editForm}
        onChange={handleTableChange}
        handleDelete={handleDeleteItem}
        admin={true}
        allTags={[]}
      />
    </>
  );
};

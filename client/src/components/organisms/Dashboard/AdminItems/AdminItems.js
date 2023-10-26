import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { AutoComplete, Modal, Select, Space } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemCardLong, ItemsCollapsedList } from '../../../molecules';
import { getAdminItems, deleteItem } from '../../../../services/items';
import { getTags } from '../../../../services/tags';
import { getPublicUsers } from '../../../../services/user';
import { tabList } from '../../../../utils/helpers';

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState('current');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({});

  // Set this constant for now - we might want to allow adjustment later
  const limit = 10;

  const { confirm } = Modal;

  const editForm = (record) => {
    return (
      <div key={record._id}>
        <ItemCardLong item={record} type="all" />
      </div>
    );
  };

  const fetchItems = useCallback(async () => {
    const { type, value } = currentUser;
    const donorId = type === 'donor' ? value : undefined;
    const shopperId = type === 'shopper' ? value : undefined;

    const { total, items } = await getAdminItems({
      isCurrent: view === 'current',
      page: currentPage,
      limit,
      donorId,
      shopperId,
    });

    setItems(items);
    setTotalItems(total);
  }, [currentPage, currentUser, view]);

  useEffect(() => {
    var tabs = tabList(user);
    tabs.forEach((t) => {
      let url = '/dashboard/' + t.id;
      if (t.id === 'adminItems' && window.location !== 'url') {
        window.history.pushState({}, '', url);
      }
    });

    const fetchTags = async () => {
      const tags = await getTags(token);
      setTags(tags);
    };

    const fetchUsers = async () => {
      const data = await getPublicUsers(token);
      setUsers(
        data.map((d) => ({
          label: `${d.firstName} ${d.lastName}`.trim(),
          value: d._id,
          type: d.kind,
        }))
      );
    };

    if (mountedRef.current) {
      fetchTags();
      fetchUsers();
    }

    return () => {
      // cleanup
      mountedRef.current = false;
    };
  }, [token, user]);

  useEffect(fetchItems, [
    token,
    user,
    view,
    currentPage,
    currentUser,
    fetchItems,
  ]);

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
    setCurrentPage(1);
    setView(view);
  };

  const handleSetPage = (page) => setCurrentPage(page);

  const handleDeleteItem = (id) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: 'modalStyle',
      onOk() {
        deleteItem(id, token).then(fetchItems);
      },
    });
  };

  return (
    <>
      <Space>
        <Select
          size="large"
          style={{ width: 150 }}
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
          options={users}
          style={{ width: 300 }}
          size="large"
          onClear={handleClearUser}
          onSelect={handleSelectUser}
          filterOption={handleFilterOptions}
          placeholder="Shopper or Donor"
          allowClear
        />
      </Space>

      <ItemsCollapsedList
        data={items}
        total={totalItems}
        current={currentPage}
        onChange={handleSetPage}
        expandRow={editForm}
        handleDelete={handleDeleteItem}
        admin={true}
        allTags={tags}
      />
    </>
  );
};

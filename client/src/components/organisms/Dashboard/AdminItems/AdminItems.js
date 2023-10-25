import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const [currentItemsPage, setCurrentItemsPage] = useState(1);
  // TODO - we need to look at the naming here it is getting confusing...
  const [currentUser, setCurrentUser] = useState({});

  // Set this constant for now - we might want to allow adjustment later
  const limit = 10;

  const { confirm } = Modal;

  const handleDelete = (id, type) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: 'modalStyle',
      onOk() {
        deleteItem(id, token).then(() => {
          // TODO need to update the component?
          // setItems(
          //   items.filter((item) => {
          //     return item._id !== id;
          //   })
          // );
          // setPastItems(
          //   pastItems.filter((item) => {
          //     return item._id !== id;
          //   })
          // );
        });
      },
    });
  };

  const editForm = (record) => {
    return (
      <div key={record._id}>
        <ItemCardLong item={record} type="all" />
      </div>
    );
  };

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

  useEffect(() => {
    const fetchItems = async () => {
      const { total, items } = await getAdminItems({
        isCurrent: view === 'current', // Current items
        limit,
        page: currentItemsPage,
        donorId: currentUser.type === 'donor' ? currentUser.value : undefined,
        shopperId:
          currentUser.type === 'shopper' ? currentUser.value : undefined,
      });

      setItems(items);
      setTotalItems(total);
    };

    fetchItems();
  }, [token, user, view, currentItemsPage, currentUser]);

  const handleSelectUser = (_value, option) => {
    setCurrentItemsPage(1);
    setCurrentUser(option);
  };

  const handleClearUser = () => {
    setCurrentItemsPage(1);
    setCurrentUser({});
  };

  const handleFilterOptions = (inputValue, option) => {
    const re = new RegExp(inputValue, 'i');
    return re.test(option.label);
  };

  const handleSelectView = (view) => {
    setCurrentItemsPage(1);
    setView(view);
  };

  const handleSetPage = (page) => setCurrentItemsPage(page);

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
        current={currentItemsPage}
        onChange={handleSetPage}
        expandRow={editForm}
        handleDelete={handleDelete}
        admin={true}
        allTags={tags}
      />
    </>
    // <StyledTabs forceRenderTabPanel={true}>
    //   <StyledTabList>
    //     <StyledTab className="itemslist">Items</StyledTab>
    //     <StyledTab>My Past Items</StyledTab>
    //   </StyledTabList>

    //   <StyledTabPanel>
    //     <ItemsCollapsedList
    //       data={items}
    //       total={totalItems}
    //       current={currentItemsPage}
    //       onFilter={(...data) => console.log(...data)}
    //       onChange={(page) => setCurrentItemsPage(page)}
    //       expandRow={editForm}
    //       handleDelete={handleDelete}
    //       admin={true}
    //       allTags={tags}
    //     />
    //   </StyledTabPanel>
    //   <StyledTabPanel>
    //     <ItemsCollapsedList
    //       data={pastItems}
    //       total={totalPastItems}
    //       current={currentPastItemsPage}
    //       onFilter={console.log}
    //       onChange={(page) => setCurrentPastItemsPage(page)}
    //       expandRow={editForm}
    //       handleDelete={handleDelete}
    //       admin={true}
    //       allTags={tags}
    //     />
    //   </StyledTabPanel>
    // </StyledTabs>
  );
};

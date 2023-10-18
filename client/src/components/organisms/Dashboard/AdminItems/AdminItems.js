import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemCardLong, ItemsCollapsedList } from '../../../molecules';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
} from './AdminItems.styles';
import { getAdminItems, deleteItem } from '../../../../services/items';
import { getTags } from '../../../../services/tags';
import { tabList } from '../../../../utils/helpers';

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPastItems, setTotalPastItems] = useState(0);
  const [currentItemsPage, setCurrentItemsPage] = useState(1);
  const [currentPastItemsPage, setCurrentPastItemsPage] = useState(1);

  // Set this constant for now - we might want to allow adjustment later
  const limit = 10;

  const { confirm } = Modal;

  const handleDelete = (id, type) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: 'modalStyle',
      onOk() {
        deleteItem(id, token).then(() => {
          setItems(
            items.filter((item) => {
              return item._id !== id;
            })
          );
          setPastItems(
            pastItems.filter((item) => {
              return item._id !== id;
            })
          );
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

    const fetchItems = async () => {
      //current items
      const { total, items } = await getAdminItems(
        true,
        limit,
        currentItemsPage
      );

      setItems(items);
      setTotalItems(total);
    };

    const fetchPastItems = async () => {
      const { total, items } = await getAdminItems(
        false,
        limit,
        currentPastItemsPage
      );

      setPastItems(items);
      setTotalPastItems(total);
    };

    const fetchAllTags = async () => {
      const tags = await getTags(token);

      setTags(tags);
    };

    fetchItems();
    fetchPastItems();
    fetchAllTags();
  }, [token, user, currentItemsPage, currentPastItemsPage]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className="itemslist">Items</StyledTab>
        <StyledTab>My Past Items</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <ItemsCollapsedList
          data={items}
          total={totalItems}
          current={currentItemsPage}
          onChange={(page) => setCurrentItemsPage(page)}
          expandRow={editForm}
          handleDelete={handleDelete}
          admin={true}
          allTags={tags}
        />
      </StyledTabPanel>
      <StyledTabPanel>
        <ItemsCollapsedList
          data={pastItems}
          total={totalPastItems}
          current={currentPastItemsPage}
          onChange={(page) => setCurrentPastItemsPage(page)}
          expandRow={editForm}
          handleDelete={handleDelete}
          admin={true}
          allTags={tags}
        />
      </StyledTabPanel>
    </StyledTabs>
  );
};

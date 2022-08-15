import React, { useContext, useState, useEffect, useRef } from "react";
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemCardLong, ItemsCollapsedList } from "../../../molecules";
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './AdminItems.styles';
import { getAdminItems, deleteItem } from '../../../../services/items';
import { getTags } from '../../../../services/tags';
import { name, tabList } from '../../../../utils/helpers';

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [pastItems, setPastItems] = useState([]);

  const { confirm } = Modal;

  const handleDelete = (id, type) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: "modalStyle",
      onOk() {
        deleteItem(id, token)
        .then(() => {
            setItems(items.filter(item => {
            return item._id !== id;
            }));
            setPastItems(pastItems.filter(item => {
              return item._id !== id;
              }));
        });
      }
    });
  };

const editForm = (record) => {
  let shippedDate = '',
    shoppedBy = '',
    donatedBy = '';
  if (record.statusUpdateDates && record.statusUpdateDates.gybShippedDate && !record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.gybShippedDate)).toLocaleString()
  } else if (record.statusUpdateDates && record.statusUpdateDates.gybShippedDate && record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.shopperShippedDate)).toLocaleString()
  } else if (record.statusUpdateDates && record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.shopperShippedDate)).toLocaleString()
  }

  if (record.shopperId && record.shopperId.firstName) {
    shoppedBy = name(record.shopperId);
  }

  if (record.donorId && record.donorId.firstName) {
    donatedBy = name(record.donorId);
  }
  return (
    <div key={record._id}><ItemCardLong item={record} type='all' shippedDate={shippedDate} shoppedBy={shoppedBy} donatedBy={donatedBy}/></div>
  )      
};

  useEffect(() => {
    var tabs = tabList(user);
    tabs.forEach((t) => {
      let url = '/dashboard/' + t.id;
      if (t.id === 'adminItems' && window.location !== 'url') {
        window.history.pushState({}, '',url)
      }
    })

    const fetchItems = async () => {
        //current items
        const items = await getAdminItems(true);
        if (!mountedRef.current) return null;
        setItems(items);
    };

    const fetchPastItems = async () => {
      const items = await getAdminItems(false);
      if (!mountedRef.current) return null;
      setPastItems(items);
    };

    const fetchAllTags = async () => {
      const tags = await getTags(token);
      if (!mountedRef.current) return null;
      setTags(tags);
    }

    fetchItems();
    fetchPastItems();
    fetchAllTags();

    return () => {
      // cleanup
      mountedRef.current = false;
    };
// eslint-disable-next-line
}, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='itemslist'>Items</StyledTab>
        <StyledTab>My Past Items</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <ItemsCollapsedList data={items} expandRow={editForm} handleDelete={handleDelete} admin={true} allTags={tags} />
      </StyledTabPanel>
      <StyledTabPanel>
        <ItemsCollapsedList data={pastItems} expandRow={editForm} handleDelete={handleDelete} admin={true} allTags={tags}  />
      </StyledTabPanel>

    </StyledTabs>

  );
};

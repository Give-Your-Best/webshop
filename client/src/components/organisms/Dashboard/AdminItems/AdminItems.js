import React, { useContext, useState, useEffect, useRef } from "react";
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemCardLong, ItemsCollapsedList } from "../../../molecules";
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './AdminItems.styles';
import { getAdminItems, deleteItem } from '../../../../services/items';

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [items, setItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);

  const { confirm } = Modal;

  const handleDelete = (id, type) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
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
  console.log(record)
  let shippedDate = '';
  if (record.statusUpdateDates && record.statusUpdateDates.gybShippedDate && !record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.gybShippedDate)).toLocaleString()
  } else if (record.statusUpdateDates && record.statusUpdateDates.gybShippedDate && record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.shopperShippedDate)).toLocaleString()
  } else if (record.statusUpdateDates && record.statusUpdateDates.shopperShippedDate) {
    shippedDate = (new Date(record.statusUpdateDates.shopperShippedDate)).toLocaleString()
  }
  return (
    <div key={record._id}><ItemCardLong item={record} type='all' shippedDate={shippedDate} /></div>
  )      
};

  useEffect(() => {

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

    fetchItems();
    fetchPastItems();

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
        <ItemsCollapsedList data={items} expandRow={editForm} handleDelete={handleDelete} admin={true} />
      </StyledTabPanel>
      <StyledTabPanel>
        <ItemsCollapsedList data={pastItems} expandRow={editForm} handleDelete={handleDelete} admin={true}  />
      </StyledTabPanel>

    </StyledTabs>

  );
};

import React, { useContext, useState, useEffect, useRef } from "react";
// import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemCardLong } from "../../../molecules";
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './AdminItems.styles';
import { getAdminItems } from '../../../../services/items';
import { Button } from '../../../atoms';
import { reopenTab } from "../../../../utils/helpers";

export const AdminItems = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [items, setItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);
//   const { confirm } = Modal;

//   const handleDelete = (id) => {
//     confirm({
//       title: `Are you sure you want to delete this item?`,
//       onOk() {
//         deleteItem(id, token)
//         .then(() => {
//             setItems(items.filter(item => {
//             return item._id !== id;
//           }));
//         });
//       }
//     });
//   };

//   const editItem = (recordIds, status) => {
//     const values = {available: (status==='available')? true: false}
//     recordIds.forEach((recordId) => {
//       updateItem(recordId, values, token)
//       .then(() => {
//         setItems(items.filter(item => {
//           if (item._id !== recordId) {
//             return item
//           } else {
//             return Object.assign(item, {available: (status==='available')? true: false})
//           }
//         }));
//       })
//     });
//     return;
//   }

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

}, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='itemslist'>Items</StyledTab>
        <HiddenStyledTab className='pastitemslist'>My Past Items</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
        {items.map((item) => (
            <div key={item._id}><ItemCardLong item={item} type='all' /></div>
        ))}
        <Button primary small onClick={() => reopenTab('pastitems')}>View Past Items</Button>
      </StyledTabPanel>
      <StyledTabPanel>
        {pastItems.map((item) => (
            <div key={item._id}><ItemCardLong item={item} type='all' /></div>
        ))}
        <Button primary small onClick={() => reopenTab('items')}>Back to Current Items</Button>
      </StyledTabPanel>

    </StyledTabs>

  );
};

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

  //lazy loading params
  const [noMoreLoad, setNoMoreLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreLoadPastItems, setNoMoreLoadPastItems] = useState(false);
  const [pagePastItems, setPagePastItems] = useState(1);

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

  const handleLoadMore = async () => {
    const more = await getAdminItems(page + 1, 20, true);
    if (more.length > 0) {
      setItems(items.concat(more));
      setPage(page+1);
    } else {
      setNoMoreLoad(true);
    }
  }

  const handleLoadMorePastItems = async () => {
    const more = await getAdminItems(pagePastItems + 1, 20, false);
    if (more.length > 0) {
      setPastItems(pastItems.concat(more));
      setPagePastItems(pagePastItems+1);
    } else {
      setNoMoreLoadPastItems(true);
    }
  }

  useEffect(() => {

    const fetchItems = async () => {
        //current items
        const items = await getAdminItems(page, 20, true);
        if (!mountedRef.current) return null;
        setItems(items);
    };

    const fetchPastItems = async () => {
      const items = await getAdminItems(page, 20, false);
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
        <HiddenStyledTab className='pastitemslist'>My Past Items</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
        {items.map((item) => (
            <div key={item._id}><ItemCardLong item={item} type='all' /></div>
        ))}
        {(!noMoreLoad)?
          <div><Button center primary onClick={handleLoadMore}>Load More</Button></div>: ''
        }
        <Button primary small onClick={() => reopenTab('pastitems')}>View Past Items</Button>
      </StyledTabPanel>
      <StyledTabPanel>
        {pastItems.map((item) => (
            <div key={item._id}><ItemCardLong item={item} type='all' /></div>
        ))}
        {(!noMoreLoadPastItems)?
          <div><Button center primary onClick={handleLoadMorePastItems}>Load More</Button></div>: ''
        }
        <Button primary small onClick={() => reopenTab('items')}>Back to Current Items</Button>
      </StyledTabPanel>

    </StyledTabs>

  );
};

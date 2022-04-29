import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './Notifications.styles';
import { ShopNotificationsList, AccountNotificationsList, ItemCardLong, AssignLocationModal } from '../../../molecules';
import { getShopNotificationsItems, getAccountNotificationsItems, updateItem } from '../../../../services/items';
import { getAdminLocations } from '../../../../services/locations';
import { Button } from '../../../atoms';
import { Modal } from 'antd';

export const Notifications = () => {
  const { token, user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shopNotificationsPendingAssign, setShopNotificationsPendingAssign] = useState([]);
  const [shopNotificationsShopped, setShopNotificationsShopped] = useState([]);
  const [accountNotificationsPendingReceive, setAccountNotificationsPendingReceive] = useState([]);
  const [accountNotificationsPendingSent, setAccountNotificationsPendingSent] = useState([]);
  const [adminLocations, setAdminLocations] = useState([]);
  const [assignAddressId, setAssignAddressId] = useState('');

  const handleOk = (values) => {
      setLoading(true);
      let updateData = {'sendVia': values.location}
      return new Promise((resolve, reject) => {
        updateItem(assignAddressId, updateData, token)
        .then(() => {
          setAssignAddressId('');
          setVisible(false);
          setShopNotificationsPendingAssign(prevState => {
            return { ...prevState, itemsCount: prevState.itemsCount - 1, items: (prevState.items).filter(item => {
              return item._id !== assignAddressId;
            }) }
          });
          resolve();
        })
      })
      .catch(() => console.log('Oops errors!'));
  };

  const handleCancel = () => {
      setVisible(false);
  };

  useEffect(() => {
    const { confirm } = Modal;

    const assignAddress = async (e) => {
      const itemId = e.target.getAttribute('data-item-id');
      setVisible(true);
      setAssignAddressId(itemId);
      return
    }

    const markReceived = (e) => {
      const itemId = e.target.getAttribute('data-item-id');
      const updateData = { "status": "received-by-gyb"};
      confirm({
        title: `Are you sure you want to do this?`,
        onOk() {
          return new Promise((resolve, reject) => {
            updateItem(itemId, updateData, token)
            .then(() => {
              setAccountNotificationsPendingReceive(prevState => {
                return { ...prevState, itemsCount: prevState.itemsCount - 1, items: (prevState.items).filter(item => {
                  return item._id !== itemId;
                }) }
              });
              resolve();
            })
          })
          .catch(() => console.log('Oops errors!'));
        }
      });
    }

    const markSent = (e) => {
      const itemId = e.target.getAttribute('data-item-id');
      const updateData = { "status": "shipped-to-shopper"};
      confirm({
        title: `Are you sure you want to do this?`,
        onOk() {
          return new Promise((resolve, reject) => {
            updateItem(itemId, updateData, token)
            .then(() => {
              setAccountNotificationsPendingSent(prevState => {
                return { ...prevState, itemsCount: prevState.itemsCount - 1, items: (prevState.items).filter(item => {
                  return item._id !== itemId;
                }) }
              });
              resolve();
            })
          })
          .catch(() => console.log('Oops errors!'));
        }
      });
    }

    const fetchShopItems = async () => {
      const items = await getShopNotificationsItems(user.id, token);
      const locations = await getAdminLocations('available', token);
      setAdminLocations(locations);
      setShopNotificationsPendingAssign({
        "key": 1,
        "name": "Item coming to you!", //approved items where the shopper has marked as send via gyb and item sendVia is empty
        "message": "Please view and assign an address for you donor",
        "itemsCount": (items[0].length || 0),
        "items": items[0],
        "action": assignAddress,
        "actionDesc": "Assign"
      });
      setShopNotificationsShopped({
          "key": 2,
          "name": "Item  shopped!", //Items where the donor is a gyb administrator and item is shopped status shopped, shipped, received?
          "message": "Address assigned, view for progress update",
          "itemsCount": (items[1].length || 0),
          "items": items[1]
      });
    };

    const fetchAccountItems = async () => {
      const items = await getAccountNotificationsItems(user.id, token);
      console.log(items);
      setAccountNotificationsPendingReceive({
          "key": 1,
          "name": "Item coming to you!", //individual account holder is the sendVia admin on the item and status shopped or shipped to gyb (i.e not received by gyb)
          "message": "Waiting for received notification",
          "itemsCount": (items[0].length || 0),
          "items": items[0],
          "action": markReceived,
          "actionDesc": "Mark received"
      });
      setAccountNotificationsPendingSent({
        "key": 2,
        "name": "Item coming to you!", //individual account holder is the sendVia admin on the item and status received by gyb (i.e not sent to shopper yet)
        "message": "Received, waiting for sent notification",
        "itemsCount": (items[1].length || 0),
        "items": items[1],
        "action": markSent,
        "actionDesc": "Mark sent"
      });
    };

    fetchShopItems();
    fetchAccountItems();

    return () => {
      // cleanup
    };
  }, [token, user]);

  const editForm = (record) => {
    return (
      <div>
      {record.items.map((item) => (
        <div key={item._id}><ItemCardLong item={item} /><Button small data-item-id={item._id} onClick={record.action}>{record.actionDesc}</Button></div>
      ))}
      </div>
    )      
  };

  return (
    <StyledTabs>
    <StyledTabList>
      <StyledTab>Shop Notifications</StyledTab>
      <StyledTab>Account Notifications</StyledTab>
    </StyledTabList>

    <StyledTabPanel>
      <AssignLocationModal loading={loading} visible={visible} handleOk={handleOk} handleCancel={handleCancel} locations={adminLocations} />
      <ShopNotificationsList data={[shopNotificationsPendingAssign, shopNotificationsShopped]} expandRow={editForm} />
    </StyledTabPanel>
    <StyledTabPanel>
      <AccountNotificationsList data={[accountNotificationsPendingReceive, accountNotificationsPendingSent]} expandRow={editForm} />
    </StyledTabPanel>

  </StyledTabs>
  );
};

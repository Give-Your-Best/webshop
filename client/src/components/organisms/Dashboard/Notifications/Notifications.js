import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './Notifications.styles';
import { ShopNotificationsList, AccountNotificationsList, ItemCardLong, AssignLocationModal } from '../../../molecules';
import { getShopNotificationsItems, getAccountNotificationsItems, updateItem, getItem } from '../../../../services/items';
import { getAdminLocations } from '../../../../services/locations';
import { getUser } from '../../../../services/user';
import { sendAutoEmail, tabList, name } from "../../../../utils/helpers";
import { Modal } from 'antd';

export const Notifications = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
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

          const item = shopNotificationsPendingAssign.items.filter((i) => {return assignAddressId === i._id})[0];
          const locationDetails = adminLocations.filter((l) => {return values.location === l._id})[0];
          locationDetails.FAO = name(item.shopperId);
          //get donor details
          const donorDetails = getUser(item.donorId, token)
          .then((donor) => {
            sendAutoEmail('item_shopped_with_address', donor, [item], locationDetails);
            console.log(donorDetails._id)
          })

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

    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminNotif') {
        window.history.pushState({}, '','/dashboard/' + t.id)
      }
    })

    const { confirm } = Modal;

    const assignAddress = async (itemId) => {
      setVisible(true);
      setAssignAddressId(itemId);
      return
    }

    const markReceived = (itemId) => {
      const d = new Date();
      let date = d.toISOString();
      const updateData = { "status": "received-by-gyb", 'statusUpdateDates.gybReceivedDate': date};

      confirm({
        title: `Are you sure you want to do this?`,
        className: "modalStyle",
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

    const markSent = (itemId) => {
      const d = new Date();
      let date = d.toISOString();
      const updateData = { "status": "shipped-to-shopper", 'statusUpdateDates.shopperShippedDate': date};

      confirm({
        title: `Are you sure you want to do this?`,
        className: "modalStyle",
        onOk() {
          return new Promise((resolve, reject) => {
            updateItem(itemId, updateData, token)
            .then(() => {

              const itemDet = getItem(itemId)
              .then((item) => {
                const shopperDetails = getUser(item.shopperId, token)
                .then((shopper) => {
                  console.log(itemDet._id)
                  console.log(shopperDetails.kind)
                  sendAutoEmail('item_on_the_way', shopper);
                })
              })

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
      const items = await getShopNotificationsItems(token);
      const locations = await getAdminLocations('available', token);

      if (!mountedRef.current) return null;

      setAdminLocations(locations);
      setShopNotificationsPendingAssign({
        "key": 1,
        "name": "Item coming to you!", //approved items where the shopper has marked as send via gyb and item sendVia is empty
        "message": "Please view and assign an address for you donor",
        "itemsCount": (items[0])? items[0].length: 0,
        "items": (items[0])? items[0]: [],
        "action": assignAddress,
        "actionDesc": "Assign"
      });
      setShopNotificationsShopped({
          "key": 2,
          "name": "Item  shopped!", //Items where the donor is a gyb administrator and item is shopped status shopped, shipped, received?
          "message": "Address assigned, view for progress update",
          "itemsCount": (items[1])? items[1].length: 0,
          "items": (items[1])? items[1]: []
      });
    };

    const fetchAccountItems = async () => {
      const items = await getAccountNotificationsItems(user.id, token);

      if (!mountedRef.current) return null;

      setAccountNotificationsPendingReceive({
          "key": 1,
          "name": "Item coming to you!", //individual account holder is the sendVia admin on the item and status shopped or shipped to gyb (i.e not received by gyb)
          "message": "Waiting for received notification",
          "itemsCount": (items[0].length || 0),
          "items": items[0] || [],
          "action": markReceived,
          "actionDesc": "Mark received"
      });
      setAccountNotificationsPendingSent({
        "key": 2,
        "name": "Item coming to you!", //individual account holder is the sendVia admin on the item and status received by gyb (i.e not sent to shopper yet)
        "message": "Received, waiting for sent notification",
        "itemsCount": (items[1].length || 0),
        "items": items[1] || [],
        "action": markSent,
        "actionDesc": "Mark sent"
      });
    };

    fetchShopItems();
    fetchAccountItems();

    return () => {
      mountedRef.current = false;
    };

  }, [token, user]);

  const editForm = (record) => {
    return (
      <div>
      {record.items.map((item) => {
        let shoppedBy = '',
          donatedBy = '';
        if (item.shopperId && item.shopperId.firstName) {
          shoppedBy = name(item.shopperId);
        }
        if (item.donorId && item.donorId.firstName) {
          donatedBy = name(item.donorId);
        }
        return (
          <div key={item._id}>
          <ItemCardLong item={item} type={user.type} actionText={record.actionDesc} action={record.action} shoppedBy={shoppedBy} donatedBy={donatedBy} />
          </div>
        )
      }
      )}
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

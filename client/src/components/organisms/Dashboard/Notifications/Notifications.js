import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  ItemsList,
} from './Notifications.styles';
import {
  ShopNotificationsList,
  AccountNotificationsList,
  ItemCardLong,
  AssignLocationModal,
} from '../../../molecules';
import {
  getShopNotificationsItems,
  getAccountNotificationsItems,
  updateItem,
  getItem,
} from '../../../../services/items';
import { getAdminLocations } from '../../../../services/locations';
import { getUser, evaluateDonorTrust } from '../../../../services/user';
import {
  sendAutoEmail,
  tabList,
  name,
  getDate,
} from '../../../../utils/helpers';
import { Modal } from 'antd';

export const Notifications = () => {
  const { token, user } = useContext(AppContext);
  const { allTags } = useContext(AccountContext);
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shopNotificationsPendingAssign, setShopNotificationsPendingAssign] =
    useState([]);
  const [shopNotificationsShopped, setShopNotificationsShopped] = useState([]);
  const [
    accountNotificationsPendingReceive,
    setAccountNotificationsPendingReceive,
  ] = useState([]);
  const [accountNotificationsPendingSent, setAccountNotificationsPendingSent] =
    useState([]);
  const [
    accountNotificationsPendingShopperReceived,
    setAccountNotificationsPendingShopperReceived,
  ] = useState([]);
  const [adminLocations, setAdminLocations] = useState([]);
  const [assignAddressId, setAssignAddressId] = useState('');

  const handleOk = (values) => {
    setLoading(true);
    let updateData = {
      sendVia: values.location,
      'statusUpdateDates.gybAssignedDate': getDate(),
    };

    return new Promise((resolve) => {
      updateItem(assignAddressId, updateData, token).then(() => {
        const item = shopNotificationsPendingAssign.items.filter((i) => {
          return assignAddressId === i._id;
        })[0];
        const locationDetails = adminLocations.filter((l) => {
          return values.location === l._id;
        })[0];
        locationDetails.FAO = name(item.shopperId);

        //send donor an email with the location address
        sendAutoEmail(
          'item_shopped_with_address',
          item.donorId,
          [item],
          locationDetails
        );

        //send admin user an email with the shopper address
        let shopperAddress = item.shopperId.deliveryAddress;
        shopperAddress.name = name(item.shopperId);
        sendAutoEmail(
          'item_assigned',
          locationDetails.adminUser,
          [item],
          shopperAddress
        );

        setAssignAddressId('');
        setVisible(false);
        setShopNotificationsPendingAssign((prevState) => {
          return {
            ...prevState,
            itemsCount: prevState.itemsCount - 1,
            items: prevState.items.filter((item) => {
              return item._id !== assignAddressId;
            }),
          };
        });
        resolve();
      });
    }).catch(() => console.log('Oops errors!'));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminNotif') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });

    const { confirm } = Modal;

    const assignAddress = async (itemId) => {
      setVisible(true);
      setAssignAddressId(itemId);
      return;
    };

    const markReceived = (itemId) => {
      const d = new Date();
      let date = d.toISOString();
      const updateData = {
        status: 'received-by-gyb',
        'statusUpdateDates.gybReceivedDate': date,
      };

      confirm({
        title: `Are you sure you want to do this?`,
        className: 'modalStyle',
        onOk() {
          return new Promise((resolve, reject) => {
            // First, update the item
            updateItem(itemId, updateData, token)
              /*
               * ============================================================
               *             !! DONOR ITEM UPLOAD CONSTRAINT !!
               * Commenting out the following code as the team have decided to remove
               * the auto evaluation of donor after 5 items.
               * To resume, please re-add the .then() function below.
               * ============================================================
               */
              // .then(() => {
              // Upon successful update, proceed to evaluate donor trust
              // evaluateDonorTrust(itemId, token)
              .then(() => {
                setAccountNotificationsPendingReceive((prevState) => {
                  return {
                    ...prevState,
                    itemsCount: prevState.itemsCount - 1,
                    items: prevState.items.filter(
                      (item) => item._id !== itemId
                    ),
                  };
                });
                resolve();
              })
              .catch((evaluateError) => {
                console.error('Error evaluating donor trust:', evaluateError);
                reject(evaluateError); // Reject the promise if evaluating donor trust fails
              })
              .catch((error) => {
                console.error('Error updating item:', error);
                reject(error); // Reject the promise if updating item fails
              });
          }).catch(() => console.log('Oops errors!'));
        },
      });
    };

    const markSent = (itemId) => {
      const d = new Date();
      let date = d.toISOString();
      const updateData = {
        status: 'shipped-to-shopper',
        'statusUpdateDates.shopperShippedDate': date,
      };

      confirm({
        title: `Are you sure you want to do this?`,
        className: 'modalStyle',
        onOk() {
          return new Promise((resolve) => {
            updateItem(itemId, updateData, token).then(() => {
              getItem(itemId).then((item) => {
                getUser(item.shopperId, token).then((shopper) => {
                  //send email to shopper that item is on its way to them
                  sendAutoEmail('item_on_the_way', shopper);
                });
              });

              setAccountNotificationsPendingSent((prevState) => {
                return {
                  ...prevState,
                  itemsCount: prevState.itemsCount - 1,
                  items: prevState.items.filter((item) => {
                    return item._id !== itemId;
                  }),
                };
              });
              resolve();
            });
          }).catch(() => console.log('Oops errors!'));
        },
      });
    };

    const fetchShopItems = async () => {
      const items = await getShopNotificationsItems(token);
      const locations = await getAdminLocations('available', token);

      setAdminLocations(locations);
      setShopNotificationsPendingAssign({
        key: 1,
        name: 'Item coming via GYB!', //approved items where the shopper has marked as send via gyb and item sendVia is empty
        message: 'Please view and assign an address for you donor',
        itemsCount: items[0] ? items[0].length : 0,
        items: items[0] ? items[0] : [],
        action: assignAddress,
        actionDesc: 'Assign',
      });
      setShopNotificationsShopped({
        key: 2,
        name: 'Item shopped!', //Items where the donor is a gyb administrator and item is shopped status shopped, shipped, received?
        message: 'Address assigned, view for progress update',
        itemsCount: items[1] ? items[1].length : 0,
        items: items[1] ? items[1] : [],
      });
    };

    const fetchAccountItems = async () => {
      const items = await getAccountNotificationsItems(user.id, token);

      setAccountNotificationsPendingReceive({
        key: 1,
        name: 'Item coming to you!', //individual account holder is the sendVia admin on the item and status shopped or shipped to gyb (i.e not received by gyb)
        message: 'Waiting for received notification',
        itemsCount: items[0].length || 0,
        items: items[0] || [],
        action: markReceived,
        actionDesc: 'Mark received',
      });
      setAccountNotificationsPendingSent({
        key: 2,
        name: 'Item coming to you!', //individual account holder is the sendVia admin on the item and status received by gyb (i.e not sent to shopper yet)
        message: 'Received, waiting for sent notification',
        itemsCount: items[1].length || 0,
        items: items[1] || [],
        action: markSent,
        actionDesc: 'Mark sent',
      });
      setAccountNotificationsPendingShopperReceived({
        key: 3,
        name: 'Item sent!',
        message: 'Waiting for shopped received notification',
        itemsCount: items[2].length || 0,
        items: items[2] || [],
      });
    };

    if (mountedRef.current) {
      fetchShopItems();
      fetchAccountItems();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [token, user]);

  const editForm = (record) => {
    return (
      <ItemsList>
        {record.items.map((item) => {
          return (
            <div key={item._id}>
              <ItemCardLong
                item={item}
                type={user.type}
                actionText={record.actionDesc}
                action={record.action}
                allTags={allTags}
              />
            </div>
          );
        })}
      </ItemsList>
    );
  };

  return (
    <StyledTabs>
      <StyledTabList>
        <StyledTab>Shop Notifications</StyledTab>
        <StyledTab>Account Notifications</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <AssignLocationModal
          loading={loading}
          visible={visible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          locations={adminLocations}
        />
        <ShopNotificationsList
          data={[shopNotificationsPendingAssign, shopNotificationsShopped]}
          expandRow={editForm}
        />
      </StyledTabPanel>
      <StyledTabPanel>
        <AccountNotificationsList
          data={[
            accountNotificationsPendingReceive,
            accountNotificationsPendingSent,
            accountNotificationsPendingShopperReceived,
          ]}
          expandRow={editForm}
        />
      </StyledTabPanel>
    </StyledTabs>
  );
};

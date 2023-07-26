import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../../context/app-context';
import { Modal } from 'antd';
import {
  ListWrapper,
  HiddenStyledTab,
  StyledTabPanel,
  StyledTabs,
  StyledTabListHidden,
  InfoNote,
} from './OrdersList.styles';
import {
  getShopperItems,
  getDonorItems,
  updateItem,
} from '../../../services/items';
import { H2, Button } from '../../atoms';
import { getUser } from '../../../services/user';
import { getLocation } from '../../../services/locations';
import { getSetting } from '../../../services/settings';
import {
  sendAutoEmail,
  getDate,
  reopenTab,
  tabList,
  lessThanSixHoursAgo,
} from '../../../utils/helpers';
import { ItemCardLong } from '../ItemCardLong';

export const OrdersList = () => {
  const { token, user, basket } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);
  const mountedRef = useRef(true);
  const [shopRemaining, setShopRemaining] = useState(0);
  const [shopRemainingChildren, setShopRemainingChildren] = useState(0);
  var actionText = '';
  var action;
  const { confirm } = Modal;

  const markAsReceived = (itemId) => {
    setItems(
      items.filter((item) => {
        if (item._id === itemId) {
          getUser(item.donorId, token).then((donor) => {
            sendAutoEmail('item_received', donor, [item]);
          });
        }
        return item._id !== itemId;
      })
    );
    return updateItem(
      itemId,
      {
        status: 'received',
        'statusUpdateDates.shopperReceivedDate': getDate(),
      },
      token
    );
  };

  const markAsSent = (itemId) => {
    confirm({
      title: `Are you sure you want to mark your item as sent?`,
      className: 'modalStyle',
      onOk() {
        const item = items.filter((i) => {
          return i._id === itemId;
        })[0];

        setItems(
          items.filter((item) => {
            return item._id !== itemId;
          })
        );

        if (typeof item.sendVia === 'string') {
          // send via exists (location assigned)

          //get location assigned and associated admin user to send them an email
          getLocation(item.sendVia, token).then((location) => {
            if (location.length && location[0].adminUser) {
              getUser(location[0].adminUser, token).then((admin) => {
                sendAutoEmail('item_on_the_way_admin', admin);
              });
            }
          });
          return updateItem(
            itemId,
            {
              status: 'shipped-to-gyb',
              'statusUpdateDates.gybShippedDate': getDate(),
            },
            token
          );
        } else {
          //send via does not exist (location not assigned or shopper has shared address

          getUser(item.shopperId, token).then((shopper) => {
            sendAutoEmail('item_on_the_way', shopper, [item]);
          });
          return updateItem(
            itemId,
            {
              status: 'shipped-to-shopper',
              'statusUpdateDates.shopperShippedDate': getDate(),
            },
            token
          );
        }
      },
    });
  };

  const cancelOrder = (itemId) => {
    confirm({
      title: `Are you sure you want to cancel your order?`,
      className: 'modalStyle',
      onOk() {
        setItems(
          items.filter((item) => {
            if (item._id === itemId) {
              getUser(item.donorId, token).then((donor) => {
                //send email to donor that order cancelled
                sendAutoEmail('order_cancelled_donor', donor, [item]);

                //send email to shopper that order cancelled
                sendAutoEmail('order_cancelled_shopper', user, [item]);

                updateItem(
                  item._id,
                  {
                    $unset: { shopperId: '' },
                    status: 'in-shop',
                    'statusUpdateDates.shoppedDate': '',
                    inBasket: false,
                    'statusUpdateDates.inBasketDate': '',
                  },
                  token
                );
              });
            }
            return item._id !== itemId;
          })
        );
      },
    });
  };

  if (user.type === 'shopper') {
    actionText = 'Mark as Received';
    action = markAsReceived;
  }

  if (user.type === 'donor') {
    actionText = 'Mark as Sent';
    action = markAsSent;
  }

  useEffect(() => {
    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      let url = '/dashboard/' + t.id;
      if (
        (t.id === 'shopperOrders' || t.id === 'donorProcessing') &&
        window.location !== url
      ) {
        window.history.pushState({}, '', url);
      }
    });

    const fetchShopperItems = async () => {
      const items = await getShopperItems(user.id);
      if (!mountedRef.current) return null;
      setItems(items);
    };

    const fetchShopperPastItems = async () => {
      const pastItems = await getShopperItems(user.id, 'received');
      if (!mountedRef.current) return null;
      setPastItems(pastItems);
    };

    const fetchSetting = async () => {
      if (!token) return null;
      const settingValue = await getSetting('shopItemLimit', token);
      if (!mountedRef.current) return null;

      if (user) {
        let countAdults =
          settingValue * user.shoppingFor -
          user.recentItems.filter((i) => i.category !== 'children').length -
          (basket ? basket.filter((i) => i.category !== 'children').length : 0);
        let countChildren =
          settingValue * user.shoppingForChildren -
          user.recentItems.filter((i) => i.category === 'children').length -
          (basket ? basket.filter((i) => i.category === 'children').length : 0);

        setShopRemaining(countAdults < 0 ? 0 : countAdults);
        setShopRemainingChildren(countChildren < 0 ? 0 : countChildren);
      } else {
        setShopRemaining(0);
        setShopRemainingChildren(0);
      }
    };

    const fetchDonorItems = async () => {
      const items = await getDonorItems(user.id);
      if (!mountedRef.current) return null;
      setItems(items);
    };

    if (user.type === 'shopper') {
      fetchShopperItems();
      fetchShopperPastItems();
      fetchSetting();
    } else if (user.type === 'donor') {
      fetchDonorItems();
    }

    return () => {
      // cleanup
      mountedRef.current = false;
    };
  }, [token, user, basket]);

  return (
    <ListWrapper>
      <StyledTabs forceRenderTabPanel={true}>
        <StyledTabListHidden>
          <HiddenStyledTab className="itemslist"></HiddenStyledTab>
          <HiddenStyledTab className="pastitemslist">
            My Past Items
          </HiddenStyledTab>
        </StyledTabListHidden>

        <StyledTabPanel>
          <H2>{user.type === 'shopper' ? 'My Orders' : 'Item Processing'}</H2>
          <InfoNote>
            {user.type === 'shopper'
              ? 'You have ' +
                shopRemaining +
                ' items for adults and ' +
                shopRemainingChildren +
                ' items for children left to shop!'
              : ''}
          </InfoNote>
          {items && items.length ? (
            items.map((item) => {
              let noAction =
                (item.status !== 'shipped-to-shopper' &&
                  user.type === 'shopper') ||
                (item.status !== 'shopped' && user.type === 'donor');
              let allowCancel =
                item.status === 'shopped' &&
                user.type === 'shopper' &&
                lessThanSixHoursAgo(
                  new Date(item.statusUpdateDates.shoppedDate)
                );

              return (
                <div key={item._id}>
                  <ItemCardLong
                    item={item}
                    type={user.type}
                    actionText={
                      allowCancel ? 'Cancel Order' : noAction ? '' : actionText
                    }
                    action={allowCancel ? cancelOrder : noAction ? '' : action}
                  />
                </div>
              );
            })
          ) : (
            <InfoNote>
              {user.type === 'shopper'
                ? ''
                : 'Your items will appear here when they have been shopped'}
            </InfoNote>
          )}
          {user.type === 'shopper' && (
            <Button primary small onClick={() => reopenTab('pastitems')}>
              View Past Orders
            </Button>
          )}
        </StyledTabPanel>

        <StyledTabPanel>
          <H2>Past Items</H2>
          {pastItems.map((item) => {
            return (
              <div key={item._id}>
                <ItemCardLong item={item} type={user.type} />
              </div>
            );
          })}
          {user.type === 'shopper' && (
            <Button primary small onClick={() => reopenTab('items')}>
              Back to Current Orders
            </Button>
          )}
        </StyledTabPanel>
      </StyledTabs>
    </ListWrapper>
  );
};

import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../../context/app-context';
import { Modal } from 'antd';
import {
  ListWrapper,
  HiddenStyledTab,
  StyledTabPanel,
  StyledTabs,
  StyledTabListHidden,
  ShopperWrapper,
  ShopperName,
  ShopperWrapperSmall,
} from './DonorOrdersList.styles';
import { getDonorItems, updateItem } from '../../../services/items';
import { H2, Button } from '../../atoms';
import { getTags } from '../../../services/tags';
import { getUser } from '../../../services/user';
import { getLocation } from '../../../services/locations';
import {
  sendAutoEmail,
  getDate,
  tabList,
  donorItemsOrdering,
} from '../../../utils/helpers';
import { ItemCardLong } from '../ItemCardLong';

export const DonorOrdersList = () => {
  const { token, user, basket } = useContext(AppContext);
  const [allTags, setAllTags] = useState([]);
  const [itemsToSend, setItemsToSend] = useState([]);
  const [itemsAwaitingReceived, setItemsAwaitingReceived] = useState([]);
  const mountedRef = useRef(true);
  const { confirm } = Modal;

  const markAsSent = (itemsList) => {
    confirm({
      title: `Are you sure you want to mark your items as sent?`,
      className: 'modalStyle',
      onOk() {
        const uuid = Date.now();

        itemsList.forEach((l) => {
          setItemsToSend(
            itemsToSend.filter((j) => {
              return j.shopperId !== l.shopperId._id;
            })
          );

          if (typeof l.sendVia === 'string') {
            // send via exists (location assigned)

            //get location assigned and associated admin user to send them an email
            getLocation(l.sendVia, token).then((location) => {
              if (location.length && location[0].adminUser) {
                getUser(location[0].adminUser, token).then((admin) => {
                  sendAutoEmail('item_on_the_way_admin', admin);
                });
              }
            });
            return updateItem(
              l._id,
              {
                status: 'shipped-to-gyb',
                'statusUpdateDates.gybShippedDate': getDate(),
                packageId: uuid,
              },
              token
            );
          } else {
            //send via does not exist (location not assigned or shopper has shared address
            sendAutoEmail('item_on_the_way', l.shopperId, [l]);
            return updateItem(
              l._id,
              {
                status: 'shipped-to-shopper',
                'statusUpdateDates.shopperShippedDate': getDate(),
                packageId: uuid,
              },
              token
            );
          }
        });
      },
    });
  };

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

    // const fetchAllTags = async () => {
    //   const tags = await getTags(token);
    //   setAllTags(tags);
    // };

    const fetchAllTags = () =>
      getTags(token).then(setAllTags).catch(console.warn);

    const fetchDonorItems = async () => {
      const items = await getDonorItems(user.id);
      const itemsOrdered = donorItemsOrdering(items);
      setItemsToSend(itemsOrdered[0]);
      setItemsAwaitingReceived(itemsOrdered[1]);
    };

    if (mountedRef.current) {
      fetchAllTags();
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
        </StyledTabListHidden>

        <StyledTabPanel>
          <H2>Item Processing</H2>
          {itemsToSend && itemsToSend.length ? (
            <>
              <p>To Send</p>
              {itemsToSend.map((item) => {
                return (
                  <ShopperWrapper key={item._id}>
                    <ShopperName>{item.shopper}</ShopperName>
                    {item.items && item.items.length
                      ? item.items.map((i) => {
                          return (
                            <div key={i._id}>
                              <ItemCardLong
                                item={i}
                                type={user.type}
                                actionText={''}
                                action={null}
                                allTags={allTags}
                              />
                            </div>
                          );
                        })
                      : ''}
                    {item.items && item.items.length && (
                      <Button
                        primary
                        right
                        small
                        onClick={() => markAsSent(item.items)}
                      >
                        Mark as Sent
                      </Button>
                    )}
                  </ShopperWrapper>
                );
              })}
            </>
          ) : (
            ''
          )}
          {itemsAwaitingReceived && itemsAwaitingReceived.length ? (
            <>
              <p>Awaiting received notification</p>
              {itemsAwaitingReceived.map((item) => {
                return item.packageId === '' ? (
                  item.items && item.items.length ? (
                    item.items.map((i) => {
                      return (
                        <ShopperWrapperSmall key={i._id}>
                          <ItemCardLong
                            item={i}
                            type={user.type}
                            actionText={''}
                            action={null}
                            allTags={allTags}
                          />
                        </ShopperWrapperSmall>
                      );
                    })
                  ) : (
                    ''
                  )
                ) : (
                  <ShopperWrapperSmall>
                    <ShopperName>{item.shopper}</ShopperName>
                    {item.items && item.items.length
                      ? item.items.map((i) => {
                          return (
                            <div key={i._id}>
                              <ItemCardLong
                                item={i}
                                type={user.type}
                                actionText={''}
                                action={null}
                                allTags={allTags}
                              />
                            </div>
                          );
                        })
                      : ''}
                  </ShopperWrapperSmall>
                );
              })}
            </>
          ) : (
            ''
          )}
        </StyledTabPanel>
      </StyledTabs>
    </ListWrapper>
  );
};

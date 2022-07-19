import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from '../../../context/app-context';
import { ListWrapper, HiddenStyledTab, StyledTabPanel, StyledTabs, StyledTabListHidden } from './OrdersList.styles';
import { getShopperItems, getDonorItems, updateItem } from '../../../services/items';
import { H2, Button } from '../../atoms';
import { getUser } from '../../../services/user';
import { sendAutoEmail, getDate, reopenTab } from "../../../utils/helpers";
import { ItemCardLong } from "../ItemCardLong";

export const OrdersList = () => {
    const { token, user } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [pastItems, setPastItems] = useState([]);
    const mountedRef = useRef(true);
    var actionText = '';
    var action;

    const markAsReceived = (itemId) => {
        setItems(items.filter(item => {
            if (item._id === itemId) {
                getUser(item.donorId, token)
                .then((donor) => {
                  sendAutoEmail('item_received', donor, [item]);
                })
            }
            return item._id !== itemId;
        }));
        return updateItem(itemId, {'status': 'received', 'statusUpdateDates.shopperReceivedDate': getDate()}, token);
    }

    const markAsSent = (itemId) => {
        const item = items.filter(i => {
            return i._id === itemId
        })[0];

        setItems(items.filter(item => {
            return item._id !== itemId;
        }));

        if (typeof item.sendVia === 'string') {
            // send via exists (location assigned)

            sendAutoEmail('item_on_the_way_admin');
            return updateItem(itemId, {'status': 'shipped-to-gyb', 'statusUpdateDates.gybShippedDate': getDate()}, token)
        } else {
            //send via does not exist (location not assigned or shopper has shared address

            getUser(item.shopperId, token)
            .then((shopper) => {
              sendAutoEmail('item_on_the_way', shopper, [item]);
            })
            return updateItem(itemId, {'status': 'shipped-to-shopper', 'statusUpdateDates.shopperShippedDate': getDate()}, token)
        }
    }

    if (user.type === 'shopper') {
        actionText = 'Mark as Received';
        action = markAsReceived;
    }

    if (user.type === 'donor') {
        actionText = 'Mark as Sent';
        action = markAsSent;
    }

    useEffect(() => {

        const fetchShopperItems = async () => {
            const items = await getShopperItems(user.id);
            if (!mountedRef.current) return null;
            setItems(items);
        };

        const fetchShopperPastItems = async () => {
            const items = await getShopperItems(user.id, 'received');
            if (!mountedRef.current) return null;
            setPastItems(items);
          };

        const fetchDonorItems = async () => {
            const items = await getDonorItems(user.id);
            if (!mountedRef.current) return null;
            setItems(items);
        };
    
        if (user.type === 'shopper') {
            fetchShopperItems();
            fetchShopperPastItems();
        } else if (user.type === 'donor') {
            fetchDonorItems();
        }

        return () => {
          // cleanup
          mountedRef.current = false;
        };

    }, [token, user]);

    return (
        <ListWrapper>
            <StyledTabs forceRenderTabPanel={true}>
                <StyledTabListHidden>
                <HiddenStyledTab className='itemslist'>{user.type === 'shopper'? 'My Orders': 'Item Processing'}</HiddenStyledTab>
                <HiddenStyledTab className='pastitemslist'>My Past Items</HiddenStyledTab>
                </StyledTabListHidden>
        
                <StyledTabPanel>
                    <H2>{user.type === 'shopper'? 'My Orders': 'Item Processing'}</H2>
                    {(items && items.length)? 

                        items.map((item) => {
                            let noAction = ((item.status !== 'shipped-to-shopper' && user.type === 'shopper') || (item.status !== 'shopped' && user.type === 'donor'))
                                return (
                                    <div key={item._id}>
                                        <ItemCardLong 
                                            item={item} 
                                            type={user.type} 
                                            actionText={(noAction)? '': actionText}
                                            action={(noAction)? '': action}
                                        />
                                    </div>)
                            }
                        )
                    : <p>{user.type === 'shopper'? 'Your items will be here when you start shopping!': 'Your items will appear here when they have been shopped'}</p>
                    }
                    {user.type === 'shopper' && <Button primary small onClick={() => reopenTab('pastitems')}>View Past Orders</Button>}
                </StyledTabPanel>

                <StyledTabPanel>
                    <H2>Past Items</H2>
                    {pastItems.map((item) => {
                        console.log(item)
                        return (
                            <div key={item._id}>
                                <ItemCardLong 
                                    item={item} 
                                    type={user.type}
                                />
                            </div>)
                    }
                    )}
                    {user.type === 'shopper' && <Button primary small onClick={() => reopenTab('items')}>Back to Current Orders</Button>}
                </StyledTabPanel>
          </StyledTabs>
        </ListWrapper>
    );
};

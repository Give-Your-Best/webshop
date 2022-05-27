import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from '../../../context/app-context';
import { ListWrapper, StyledTab, StyledTabPanel, StyledTabList, StyledTabs } from './OrdersList.styles';
import { getShopperItems, getDonorItems } from '../../../services/items';
import { ItemCardLong } from "../ItemCardLong";
import { updateItem } from '../../../services/items';

export const OrdersList = () => {
    const { token, user } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const mountedRef = useRef(true);
    var actionText = '';
    var action;

    const markAsReceived = (itemId) => {
        console.log('mark as received')
        const d = new Date();
        let date = d.toISOString();
        setItems(items.filter(item => {
            return item._id !== itemId;
        }));
        return updateItem(itemId, {'status': 'received', 'statusUpdateDates.shopperReceivedDate': date}, token);
    }

    const markAsSent = (itemId) => {
        console.log('mark as sent');
        const d = new Date();
        let date = d.toISOString();
        const item = items.filter(i => {
            return i._id === itemId
        })[0];

        setItems(items.filter(item => {
            return item._id !== itemId;
        }));

        if (typeof item.sendVia === 'string') {
            console.log('send via exists (location assigned)');
            return updateItem(itemId, {'status': 'shipped-to-gyb', 'statusUpdateDates.gybShippedDate': date}, token)
        } else {
            console.log('send via does not exist (location not assigned or shopper has shared address');
            return updateItem(itemId, {'status': 'shipped-to-shopper', 'statusUpdateDates.shopperShippedDate': date}, token)
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
            console.log(items)
            setItems(items);
        };

        const fetchDonorItems = async () => {
            const items = await getDonorItems(user.id);
            if (!mountedRef.current) return null;
            console.log(items)
            setItems(items);
        };
    
        if (user.type === 'shopper') {
            fetchShopperItems();
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
                <StyledTabList>
                <StyledTab>{user.type === 'shopper'? 'My Orders': 'Item Processing'}</StyledTab>
                </StyledTabList>
        
                <StyledTabPanel>
                    {items.map((item) => {
                    if ((item.status !== 'shipped-to-shopper' && user.type === 'shopper') || (item.status !== 'shopped' && user.type === 'donor')) {
                        return (
                            <div key={item._id}>
                                <ItemCardLong 
                                    item={item} 
                                    type={user.type} 
                                />
                            </div>)
                    } else {
                        return (
                            <div key={item._id}>
                                <ItemCardLong 
                                    item={item} 
                                    type={user.type} 
                                    actionText={actionText}
                                    action={action}
                                />
                            </div>)
                    }
                    }
                    )}
                </StyledTabPanel>
          </StyledTabs>
        </ListWrapper>
    );
};

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../../../context/app-context';
import { ListWrapper, StyledTab, StyledTabPanel, StyledTabList, StyledTabs } from './OrdersList.styles';
import { Button } from '../../atoms';
import { getItems } from '../../../services/items';
import { ItemCardLong } from "../ItemCardLong";

export const OrdersList = () => {
    const { token, user } = useContext(AppContext);
    const [items, setItems] = useState([]);

    const markAsDelivered = () => {
        console.log('mark as delivered')
        //to do update item status
    }

    const markAsSent = () => {
        console.log('mark as sent')
        //to do update item status
    }

    useEffect(() => {

        const fetchItems = async () => {
            const items = await getItems('approved', user.type, user.id);
            setItems(items);
        };
    
        fetchItems();
        return () => {
          // cleanup
        };

    }, [token, user]);

    return (
        <ListWrapper>
            <StyledTabs forceRenderTabPanel={true}>
                <StyledTabList>
                <StyledTab>{user.type === 'shopper'? 'My Orders': 'Item Processing'}</StyledTab>
                </StyledTabList>
        
                <StyledTabPanel>
                    {items.map((item) => (
                    <div key={item._id}>
                        <ItemCardLong item={item} />
                        {user.type === 'shopper' && <Button small onClick={markAsDelivered}>Mark as delivered</Button>}
                            {user.type === 'donor' && <Button small onClick={markAsSent}>Mark as sent</Button>}
                    </div>
                    ))}
                </StyledTabPanel>
          </StyledTabs>
        </ListWrapper>
    );
};

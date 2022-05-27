import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Modal } from 'antd';
import { Container } from '../../components';
import { AccountWelcome, ItemCardLong } from '../../components/molecules';
import { Button, Notification } from '../../components/atoms';
import { BasketSidebar, BasketDetails, BasketWrapper } from './Basket.styles';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../services/items';

export const Basket = () => {
  const { setBasket, basket, user, token, setUser } = useContext(AppContext);
  let history = useHistory();
  const { confirm } = Modal;

  const address = (
    <div>
    <p>Please check your address below, it can be updated from your account profile.</p>
    {user.deliveryAddress.firstLine && <p>First line: {user.deliveryAddress.firstLine}</p>}
    {user.deliveryAddress.secondLine && <p>Second line: {user.deliveryAddress.secondLine}</p>}
    {user.deliveryAddress.city && <p>City: {user.deliveryAddress.city}</p>}
    {user.deliveryAddress.postcode && <p>Postcode: {user.deliveryAddress.postcode}</p>}
    </div>
)


  const removeFromBasket = (itemId) => {
    confirm({
      title: `Are you sure you wish to remove from your basket?`,
      onOk() {
        setBasket(basket.filter(item => {
          return item._id !== itemId
        }));
      }
    });
  }

  const basketList = () => {
    if (basket && basket.length) {
      return (
        <div>
        {basket.map((b)=>{
          return (<ItemCardLong key={b._id} item={b} actionText={'Remove from basket'} action={removeFromBasket} />);
        })}
        </div>
      )
    } else {
      return <h2>There are no items in your basket!</h2>
    }
  }

  const checkout = () => {
    confirm({
      title: `Is this your address?`,
      content: address,
      okText: 'Continue to checkout',
      onOk() {
        const promises = basket.map((item) => {
          const d = new Date();
          let date = d.toISOString();
            setUser(user => ({
              ...user,
              'recentItems': [
                ...user.recentItems || [],
                item
              ]
            }));
           return updateItem(item._id, {'shopperId': user.id, 'status': 'shopped', 'statusUpdateDates.shoppedDate': date}, token)
        });
        Promise.all(promises)
        .then(() => {
          setBasket(null);
          //TO DO Email Notification to donor that item has been shopped
          Notification('Items shopped!', 'You will receive updates on your item delivery soon!', 'success');
          history.push(`/`);
        })
        .catch(error => {
          Notification('Error shopping items', error, 'error');
        });
      }
    });
  }


  return (
    <Container>
      <BasketWrapper>
        <BasketSidebar>
          {user && <AccountWelcome />}
        </BasketSidebar>
        <BasketDetails>
          <h1>My Basket</h1>
        {basketList()}
        <Button primary small left onClick={() => {history.push(`/products`)}}>Keep Shopping</Button>
        {basket && <Button primary small onClick={checkout}>Checkout</Button>}
        </BasketDetails>
      </BasketWrapper>
    </Container>
  );
};

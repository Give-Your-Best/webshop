import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Modal } from 'antd';
import { Container } from '../../components';
import { AccountWelcome, ItemCardBasket } from '../../components/molecules';
import { Button, Notification } from '../../components/atoms';
import {
  BasketSidebar,
  BasketDetails,
  BasketWrapper,
  AddressLink,
} from './Basket.styles';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../services/items';
import { getUser } from '../../services/user';
import { sendAutoEmail, getDate, name } from '../../utils/helpers';

export const Basket = () => {
  const { setBasket, basket, user, token, setUser, setBasketTimer } =
    useContext(AppContext);
  let history = useHistory();
  const { confirm } = Modal;

  const address = user ? (
    <div>
      {user.deliveryAddress.firstLine && (
        <p>First line: {user.deliveryAddress.firstLine}</p>
      )}
      {user.deliveryAddress.secondLine && (
        <p>Second line: {user.deliveryAddress.secondLine}</p>
      )}
      {user.deliveryAddress.city && <p>City: {user.deliveryAddress.city}</p>}
      {user.deliveryAddress.postcode && (
        <p>Postcode: {user.deliveryAddress.postcode}</p>
      )}
      <AddressLink
        onClick={() => {
          history.push('/dashboard/shopperDetails');
          Modal.destroyAll();
        }}
      >
        Edit address
      </AddressLink>
    </div>
  ) : (
    ''
  );

  const basketList = () => {
    if (basket && basket.length) {
      return (
        <div>
          {basket.map((b) => {
            return (
              <ItemCardBasket key={b._id} item={b} actionText={'Remove'} />
            );
          })}
        </div>
      );
    } else {
      return <h2>There are no items in your basket!</h2>;
    }
  };

  const checkout = () => {
    //if no address
    if (
      !user.deliveryAddress.firstLine ||
      user.deliveryAddress.firstLine === ''
    ) {
      confirm({
        title: `Please update your account with a delivery address!`,
        className: 'modalStyle',
      });
      //otherwise confirm address and continue
    } else {
      confirm({
        title: `Is this your address?`,
        content: address,
        className: 'modalStyle',
        okText: 'Continue to checkout',
        onOk() {
          const promises = basket.map((item) => {
            return updateItem(
              item._id,
              {
                shopperId: user.id,
                status: 'shopped',
                'statusUpdateDates.shoppedDate': getDate(),
              },
              token
            );
          });
          Promise.all(promises)
            .catch((error) => {
              Notification('Error shopping items', error, 'error');
              basket.map((item) => {
                //revert to inshop if error
                return updateItem(
                  item._id,
                  {
                    shopperId: '',
                    status: 'in-shop',
                    'statusUpdateDates.shoppedDate': '',
                  },
                  token
                );
              });
            })
            .then(() => {
              //moved donor email send once all items were successfully updated. It was causing weird problems
              basket.map((item) => {
                // add to recent items
                setUser((user) => ({
                  ...user,
                  recentItems: user.recentItems
                    ? user.recentItems.concat(item)
                    : [item],
                }));

                //get donor details
                getUser(item.donorId, token).then((donor) => {
                  if (
                    user.deliveryPreference === 'direct'
                    // && donor.trustedDonor === true <-- share regardless if trusted or not, so long as the shopper selected 'direct'.
                  ) {
                    //send address directly in email
                    user.deliveryAddress.name = name(user);

                    sendAutoEmail(
                      'item_shopped_with_address',
                      donor,
                      [item],
                      user.deliveryAddress
                    );
                  } else if (
                    user.deliveryPreference === 'via-gyb' &&
                    donor.trustedDonor === true
                  ) {
                    //send email without address - to be sent later with gyb address
                    sendAutoEmail('item_shopped_pending_address', donor, [
                      item,
                    ]);
                    sendAutoEmail('new_item_to_assign_location');
                  }
                  /*
                   * ============================================================
                   *             !! DONOR ITEM UPLOAD CONSTRAINT !!
                   * Commenting out the following code as the team have decided to remove
                   * the untrusted donor constraint. The below code was used to automatically assign items
                   * to be sent via GYB HQ if the donor was not trusted.
                   * ============================================================
                   */
                  // } else if (donor.trustedDonor === false) {
                  //   // When donor is not trusted we want to send the item via GYB regardless of the user's delivery preference
                  //   // setting 'sendVia' directly to the GYB location ID means that it will by-passes the need for manual location assingment in the [Shop Notifications].
                  //   // Upon checking-out this basket, it will notify the donor that they have an item to dispatch (and the address will be the GYB office).

                  //   let updateData = {
                  //     sendVia: '63da693b03ae730016ca7e16', // need to find a better way to get this ID - it's the GYB location ID
                  //     'statusUpdateDates.gybAssignedDate': getDate(),
                  //   };
                  //   updateItem(item._id, updateData, token).then(() => {
                  //     sendAutoEmail('item_shopped_auto_send_via_gyb', donor, [
                  //       item,
                  //     ]);
                  //   });
                  // }
                });
                return true;
              });
              sendAutoEmail('order_placed', user, basket, user.deliveryAddress);
              setBasket(null);
              setBasketTimer(null);
              //TO DO Email Notification to donor that item has been shopped
              Notification(
                'Items shopped!',
                'You will receive updates on your item delivery soon!',
                'success'
              );
              history.push(`/`);
            })
            .catch((error) => {
              Notification('Error shopping items', error, 'error');
            });
        },
      });
    }
  };

  return (
    <Container>
      <BasketWrapper>
        <BasketSidebar>{user && <AccountWelcome />}</BasketSidebar>
        <BasketDetails>
          <h1>My Basket</h1>
          {basketList()}
          <Button
            primary
            left
            onClick={() => {
              history.push(`/products`);
            }}
          >
            Keep Shopping
          </Button>
          {basket && (
            <Button primary onClick={checkout}>
              Checkout
            </Button>
          )}
        </BasketDetails>
      </BasketWrapper>
    </Container>
  );
};

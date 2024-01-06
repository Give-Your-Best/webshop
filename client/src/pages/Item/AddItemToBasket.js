import React, { useContext } from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { getItem, updateItem } from '../../services/items';
import { Button } from '../../components/atoms';
import { useHistory } from 'react-router-dom';
import { getDate } from '../../utils/helpers';
import { resetBasketTimer } from '../../utils/resetBasketTimer';

const AddToBasketButton = ({ item, limit }) => {
  const { user, setBasket, basket, token, basketTimer, setBasketTimer } =
    useContext(AppContext);

  const { confirm } = Modal;

  const history = useHistory();

  // const basketReset = (itemDetails) => {
  //   console.log('regular item timer set');
  //   clearTimeout(basketTimer);
  //   setBasketTimer(
  //     setTimeout(() => {
  //       if (basket && basket.length) {
  //         //clear basket from db
  //         basket.concat(itemDetails).forEach(async (item) => {
  //           await updateItem(
  //             item._id,
  //             { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
  //             token
  //           );
  //         });
  //         Notification(
  //           'Items expired!',
  //           'The items in your basket have expired.',
  //           'warning'
  //         );
  //       }

  //       setBasket(null);
  //       setBasketTimer(null);
  //     }, 3600000)
  //   ); //expires after an hour
  // };

  const addToBasket = async () => {
    const isShopped = basket && basket.some((i) => i._id === item._id);
    //recent items shopped count and items in basket count needs to be within limit.
    //note: Limit is calculated from the shop settings and multiplied by the number of people the user is shopping for
    let cannotShop = false;

    if (item.category === 'children') {
      cannotShop =
        (user
          ? user.recentItems.filter((i) => i.category === 'children').length
          : 0) +
          (basket
            ? basket.filter((i) => i.category === 'children').length
            : 0) >=
        limit * (user ? user.shoppingForChildren : 0);
    } else {
      cannotShop =
        (user
          ? user.recentItems.filter((i) => i.category !== 'children').length
          : 0) +
          (basket
            ? basket.filter((i) => i.category !== 'children').length
            : 0) >=
        limit * (user ? user.shoppingFor : 1);
    }

    if (!user || user.type !== 'shopper') {
      //if not signed in
      confirm({
        title: `Please sign up as a shopper to shop!`,
        className: 'modalStyle',
      });
      return;
    }

    if (isShopped) {
      //if already in basket
      confirm({
        className: 'modalStyle',
        title: `This item is already in your basket`,
      });
      return;
    }

    if (cannotShop && item.category === 'children') {
      //if limit reached
      confirm({
        className: 'modalStyle',
        title: `You have reached your weekly shopping limit for children's items!`,
        content:
          'Please check your current orders on your account profile or update your profile info!',
      });
      return;
    }

    if (cannotShop && item.category !== 'children') {
      //if limit reached
      confirm({
        className: 'modalStyle',
        title: `You have reached your weekly shopping limit!`,
        content: 'Please check your current orders on your account profile.',
      });
      return;
    }

    const itemDetails = await getItem(item._id);
    let anHourAgo = new Date(new Date().getTime() - 1000 * 60 * 60);
    let basketDate =
      itemDetails.statusUpdateDates &&
      itemDetails.statusUpdateDates.inBasketDate
        ? new Date(itemDetails.statusUpdateDates.inBasketDate)
        : '';

    if (
      (itemDetails.inBasket === true && basketDate >= anHourAgo) ||
      itemDetails.status !== 'in-shop'
    ) {
      //if already added to basket by someone else with the hour
      confirm({
        className: 'modalStyle',
        title: `Sorry! This item has been shopped.`,
      });
      history.push(`/`);
      return;
    }

    updateItem(
      item._id,
      { inBasket: true, 'statusUpdateDates.inBasketDate': getDate() },
      token
    );
    //update basket date for each item in basket
    if (basket && basket.length) {
      basket.forEach((item) => {
        updateItem(
          item._id,
          { inBasket: true, 'statusUpdateDates.inBasketDate': getDate() },
          token
        );
      });
    }

    setBasket(
      basket && basket.length ? basket.concat([itemDetails]) : [itemDetails]
    );

    // set up timer for resetting the basket - to expire
    resetBasketTimer(
      basket,
      setBasket,
      basketTimer,
      setBasketTimer,
      item,
      token
    );

    confirm({
      title: `Item added to basket.`,
      className: 'modalStyle',
      onOk() {
        history.push('/basket');
      },
      okText: 'View Basket',
      onCancel() {
        history.push(`/products`);
      },
      cancelText: 'Continue Shopping',
    });
  };

  return (
    <Button primary left small onClick={addToBasket}>
      Add to Basket
    </Button>
  );
};

export default AddToBasketButton;

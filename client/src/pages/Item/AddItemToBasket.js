import React, { useContext, useEffect } from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { getItem, updateItem } from '../../services/items';
import { Notification, Button } from '../../components/atoms';
import { useHistory } from 'react-router-dom';
import { getDate } from '../../utils/helpers';
import { resetBasketItems } from '../../utils/batchItemHelpers';

const AddToBasketButton = ({ item, limit }) => {
  const { user, setBasket, basket, token, basketTimer, setBasketTimer } =
    useContext(AppContext);

  const { confirm } = Modal;

  const history = useHistory();

  // may need to look into this, but for now, the eslint is complaining that basketTimer and setBasketTimer are missing [they cause infinite loops otherwise]
  /* eslint-disable */
  useEffect(() => {
    clearTimeout(basketTimer);
    const handleBasketTimeout = async () => {
      if (basket && basket.length) {
        await resetBasketItems(basket, token);
        Notification(
          'Items expired!',
          'The items in your basket have expired.',
          'warning'
        );
      }
      setBasket(null);
      if (basketTimer) {
        setBasketTimer(null);
      }
    };
    setBasketTimer(setTimeout(handleBasketTimeout, 3600000)); //expires after an hour
  }, [basket, setBasket, token]);
  /* eslint-enable */

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

/* eslint-disable */
import React, { useContext } from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { updateItem } from '../../services/items';
import { Notification, Button } from '../../components/atoms';
import { useHistory } from 'react-router-dom';
import { getDate } from '../../utils/helpers';
import { updateBatchItemQuantity } from '../../utils/updateBatchItemQuantity';
import { createItemWithoutImageUpload } from '../../services/items';
import { resetBasketTimer } from '../../utils/resetBasketTimer';

const AddBatchItemToBasketButton = ({
  item,
  batchItem,
  limit,
  selectedSize,
  quantity,
}) => {
  const { user, setBasket, basket, token, basketTimer, setBasketTimer } =
    useContext(AppContext);

  const { confirm } = Modal;

  const history = useHistory();

  const calculateUserLimit = (category) => {
    const userShoppingFor = user
      ? category === 'children'
        ? user.shoppingForChildren
        : user.shoppingFor
      : 0;
    return limit * userShoppingFor;
  };

  const calculateRecentItemsCount = (category) => {
    return user
      ? user.recentItems.filter((item) =>
          category === 'children'
            ? item.category === 'children'
            : item.category !== 'children'
        ).length
      : 0;
  };

  const calculateBasketItemsCount = (category) => {
    return basket
      ? basket.filter((item) =>
          category === 'children'
            ? item.category === 'children'
            : item.category !== 'children'
        ).length
      : 0;
  };

  const addToBasket = async () => {
    // Calculate the available quantity based on the limit and items in the basket
    // note: Limit is calculated from the shop settings and multiplied by the number of people the user is shopping for
    const category = item.category;
    const userLimit = calculateUserLimit(category);
    const recentItemsCount = calculateRecentItemsCount(category);
    const basketItemsCount = calculateBasketItemsCount(category);
    const availableQuantity = userLimit - recentItemsCount + basketItemsCount;

    if (!user || user.type !== 'shopper') {
      //if not signed in
      confirm({
        title: `Please sign up as a shopper to shop!`,
        className: 'modalStyle',
      });
      return;
    }

    // shopping limit reached
    if (availableQuantity === 0) {
      const shoppingLimitMessage =
        item.category === 'children'
          ? `weekly shopping limit for children's items`
          : `weekly shopping limit`;
      confirm({
        className: 'modalStyle',
        title: `Shopping Limit Reached!`,
        content: `You have reached your ${shoppingLimitMessage}. Please check your current orders on your account profile or update your profile info!`,
      });
      return;
    }

    if (quantity > availableQuantity) {
      // quantity too large for available size
      confirm({
        className: 'modalStyle',
        title: `Not enough available quantity!`,
        content: `You can only add up to ${availableQuantity} ${item.category}'s items to your basket.`,
      });
      return;
    }

    // create items per quantity
    const items = [];
    const { _id, ...itemWithoutId } = item;
    const categoryKey = category === 'shoes' ? 'shoeSize' : 'clothingSize';
    // Construct data for each item in the quantity (based on the templateItem: re-use photos that have already been uploaded)
    const itemDetails = {
      ...itemWithoutId,
      isTemplateBatchItem: false,
      [categoryKey]: selectedSize,
      inBasket: true,
      'statusUpdateDates.inBasketDate': getDate(),
    };
    for (let i = 0; i < quantity; i++) {
      // For each item in the batch, create a new item and add it to the basket
      const newItemDetails = await createItemWithoutImageUpload(
        itemDetails,
        token
      );
      items.push(newItemDetails.item);
    }
    // update batch item with reduced quantity
    await updateBatchItemQuantity(
      selectedSize,
      item.category,
      batchItem._id,
      quantity,
      false,
      token
    );
    if (basket && basket.length) {
      //update basket date for each item in basket
      basket.forEach((b) => {
        updateItem(
          b._id,
          { inBasket: true, 'statusUpdateDates.inBasketDate': getDate() },
          token
        );
      });
    }

    setBasket(basket && basket.length ? basket.concat(items) : items);

    // set up timer for resetting the basket - to expire
    resetBasketTimer(
      basket,
      setBasket,
      basketTimer,
      setBasketTimer,
      items,
      token
    );

    const message =
      items.length > 1 ? 'Items added to basket' : 'Item added to basket';
    Notification('Success', message, 'success');
    // confirm({
    //   title: `Item added to basket.`,
    //   className: 'modalStyle',
    //   onOk() {
    //     history.push('/basket');
    //   },
    //   okText: 'View Basket',
    //   onCancel() {
    //     history.push(`/products`);
    //   },
    //   cancelText: 'Continue Shopping',
    // });
  };

  return (
    <Button
      primary
      left
      small
      onClick={() => {
        addToBasket();
      }}
    >
      Add to Basket
    </Button>
  );
};

export default AddBatchItemToBasketButton;

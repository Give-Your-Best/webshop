import React, { useContext, useEffect } from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { updateItem } from '../../services/items';
import { Notification, Button } from '../../components/atoms';
import { getDate } from '../../utils/helpers';
import {
  updateBatchItemQuantity,
  resetBasketItems,
} from '../../utils/batchItemHelpers';
import { createItem } from '../../services/items';

const AddBatchItemToBasketButton = ({
  item,
  batchItem,
  limit,
  selectedSize,
  quantity,
  afterAddToBasket,
}) => {
  const { user, setBasket, basket, token, basketTimer, setBasketTimer } =
    useContext(AppContext);

  const { confirm } = Modal;

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

    if (selectedSize === '') {
      //if size is not selected
      confirm({
        title: `Please select a size for the item!`,
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
    // eslint-disable-next-line
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
      // Note: items are created without uploading images to cloudinary, instead, the templateItem's images are simply re-used: [3rd param]
      const newItemDetails = await createItem(itemDetails, token, true);
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

    const message =
      items.length > 1 ? 'Items added to basket' : 'Item added to basket';
    Notification('Success', message, 'success');

    // reset the size and quantity values
    afterAddToBasket();
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

import {
  deleteItem,
  updateItem,
  getBatchItem,
  updateBatchItem,
} from '../services/items';

// updates multiple batch items with changes to different sizes per each batch-item
// example scenario: when resetting the whole basket, we need to clear all items (which may have multiple batch-items)
// note: it takes a map of batch-items as param
const bulkUpdateBatchItemQuantity = async (updateDataMap, token) => {
  try {
    for (const [batchId, sizes] of updateDataMap.entries()) {
      const sizeType = Object.keys(sizes)[0];
      const { batchItem } = await getBatchItem(batchId);

      if (batchItem[sizeType]) {
        Object.entries(sizes[sizeType]).forEach(([size, quantity]) => {
          if (batchItem[sizeType][size]) {
            batchItem[sizeType][size] += quantity;
          }
        });
      }

      // Exclude _id from batchItem (eslint complains that '_id' is not used).
      // eslint-disable-next-line
      const { _id, ...batchItemWithoutId } = batchItem;
      await updateBatchItem(
        batchItemWithoutId.templateItem,
        batchItemWithoutId,
        token
      );
    }
  } catch (error) {
    console.error('Error updating batch item quantity:', error);
    return {
      success: false,
      message: `Error updating batch item quantity: ${String(error)}`,
    };
  }
};

// updates the quantity of a batch-item, for a given size.
// note: it can either increase or decrease the quantity determined by the [increaseFlag]
// decrease scenario: item added to basket; decrease batch item's quantity for that size
// increase scenario: item removed from basket; increase batch item's quantity for that size
const updateBatchItemQuantity = async (
  size,
  category,
  batchId,
  quantity,
  increaseFlag,
  token
) => {
  try {
    const sizeType = category === 'shoes' ? 'shoeSizes' : 'clothingSizes';
    const { batchItem } = await getBatchItem(batchId);
    if (batchItem[sizeType] && size in batchItem[sizeType]) {
      let updatedQuantity;
      if (increaseFlag) {
        // bring quantity back to batchItem (e.g. used when an item associated with a batch-item is removed from order)
        updatedQuantity = batchItem[sizeType][size] + quantity;
      } else {
        // reduce quantity from batchItem
        updatedQuantity = Math.max(batchItem[sizeType][size] - quantity, 0);
      }

      const updatedSizes = {
        ...batchItem[sizeType],
        [size]: updatedQuantity,
      };

      // Exclude _id from batchItem (eslint complains that '_id' is not used).
      // eslint-disable-next-line
      const { _id, ...batchItemWithoutId } = batchItem;
      const updatedBatchItemDetails = {
        ...batchItemWithoutId,
        [sizeType]: updatedSizes,
      };
      const response = await updateBatchItem(
        batchItem.templateItem,
        updatedBatchItemDetails,
        token
      );
      return response;
    }
  } catch (error) {
    console.error('Error updating batch item quantity:', error);
    return {
      success: false,
      message: `Error updating batch item quantity: ${String(error)}`,
    };
  }
};

// clears the basket of all items
// if the items are batch-items, it constructs a map and passes it to the method that deals with bulk updates
// this way, we only call the updateBatchItem() only once per each batch-item
const resetBasketItems = async (basket, token) => {
  try {
    const batchItemsMap = new Map();
    await Promise.all(
      basket.map(async (b) => {
        if (b.batchId && !b.isTemplateBatchItem) {
          const sizeType =
            b.category === 'shoes' ? 'shoeSizes' : 'clothingSizes';
          const size = b.shoeSize.length > 0 ? b.shoeSize : b.clothingSize;
          if (!batchItemsMap.has(b.batchId)) {
            batchItemsMap.set(b.batchId, {});
          }
          const batchItemDetails = batchItemsMap.get(b.batchId);
          if (
            !Object.prototype.hasOwnProperty.call(batchItemDetails, sizeType)
          ) {
            batchItemDetails[sizeType] = {};
          }
          const sizeTypeDetails = batchItemDetails[sizeType];
          if (!Object.prototype.hasOwnProperty.call(sizeTypeDetails, size)) {
            sizeTypeDetails[size] = 1;
          } else {
            sizeTypeDetails[size] += 1;
          }
          await deleteItem(b._id, token);
        } else {
          await updateItem(
            b._id,
            { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
            token
          );
        }
      })
    );
    if (batchItemsMap && batchItemsMap.size > 0) {
      await bulkUpdateBatchItemQuantity(batchItemsMap, token);
    }
  } catch (error) {
    console.error('Error resetting the basket items:', error);
    return {
      success: false,
      message: `Error resetting the basket items: ${String(error)}`,
    };
  }
};

export {
  resetBasketItems,
  updateBatchItemQuantity,
  bulkUpdateBatchItemQuantity,
};

import { getBatchItem, updateBatchItem } from '../services/items';

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
    if (batchItem[sizeType] && batchItem[sizeType][size]) {
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

export { updateBatchItemQuantity };

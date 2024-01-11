import { getBatchItem, updateBatchItem } from '../services/items';

const bulkUpdateBatchQuantity = async (updateDataMap, token) => {
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

export { bulkUpdateBatchQuantity };

import { bulkUpdateBatchQuantity } from './bulkUpdateBatchQuantity';
import { deleteItem, updateItem } from '../services/items';

const resetBasketItems = async (basket, token) => {
  try {
    const batchItemsMap = new Map();
    basket.forEach(async (b) => {
      // if it's a [child-batch-item], we need to delete it and capture the data so we can update the corresponding [parent-batch-item] accordingly.
      // the logic below deals with aggregating all the child-batch-items into a map, so that only one 'update' method can be called per parent-batch-item.
      if (b.batchId && !b.isTemplateBatchItem) {
        const sizeType = b.category === 'shoes' ? 'shoeSizes' : 'clothingSizes';
        const size = b.shoeSize.length > 0 ? b.shoeSize : b.clothingSize;
        if (!batchItemsMap.has(b.batchId)) {
          batchItemsMap.set(b.batchId, {});
        }
        const batchItemDetails = batchItemsMap.get(b.batchId);
        if (!Object.prototype.hasOwnProperty.call(batchItemDetails, sizeType)) {
          batchItemDetails[sizeType] = {};
        }
        const sizeTypeDetails = batchItemDetails[sizeType];
        if (!Object.prototype.hasOwnProperty.call(sizeTypeDetails, size)) {
          sizeTypeDetails[size] = 1;
        } else {
          sizeTypeDetails[size] += 1;
        }
        deleteItem(b._id, token);
      } else {
        updateItem(
          b._id,
          { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
          token
        );
      }
    });
    if (batchItemsMap && batchItemsMap.size > 0) {
      bulkUpdateBatchQuantity(batchItemsMap, token);
    }
  } catch (error) {
    console.error('Error resetting the basket items:', error);
    return {
      success: false,
      message: `Error resetting the basket items: ${String(error)}`,
    };
  }
};

export { resetBasketItems };

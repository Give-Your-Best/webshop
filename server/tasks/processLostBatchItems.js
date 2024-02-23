const { getLostItems, getBatchItem, deleteItem } = require('../services/items');

module.exports = async (logger) => {
  try {
    const lostItems = await getLostItems();

    /*
     * For each lost item, find the batch item and increment the count of the
     * lost item's size. Then delete the lost item.
     */
    for (const item of lostItems) {
      const batchItem = await getBatchItem(item.batchId);
      const size =
        item.shoeSize.length > 0 ? item.shoeSize[0] : item.clothingSize[0];

      if (item.shoeSize.length > 0) {
        batchItem.shoeSizes[size] = (batchItem.shoeSizes[size] || 0) + 1;
      } else {
        batchItem.clothingSizes[size] =
          (batchItem.clothingSizes[size] || 0) + 1;
      }

      // Increment the quantity property of the batchItem by 1
      batchItem.quantity = (batchItem.quantity || 0) + 1;

      await batchItem.save();
      await deleteItem(item._id);
    }

    logger.info(`Processed ${lostItems.length} lost items.`);
  } catch (error) {
    logger.error(`Error processing lost items: ${error}`);
  }
};

const { getLostItems, getBatchItem, deleteItem } = require('../services/items');

module.exports = async (logger) => {
  try {
    const lostItems = await getLostItems();

    // Create a map of batchId to lostItems (given many items will be from the same batch, it's more efficient to process them together)
    const batchIdToLostItems = lostItems.reduce((map, item) => {
      if (!map[item.batchId]) {
        map[item.batchId] = [];
      }
      map[item.batchId].push(item);
      return map;
    }, {});

    // For each unique batchId, fetch the batchItem once, update it, and then save it
    for (const batchId in batchIdToLostItems) {
      const batchItemResponse = await getBatchItem(batchId);
      if (!batchItemResponse || !batchItemResponse.batchItem) {
        console.error(`No batch item found for id: ${batchId}`);
        continue;
      }
      const batchItem = batchItemResponse.batchItem;
      const items = batchIdToLostItems[batchId];

      for (const item of items) {
        const size =
          item.shoeSize.length > 0 ? item.shoeSize[0] : item.clothingSize[0];

        if (item.shoeSize.length > 0) {
          const currentSizeCount = batchItem.shoeSizes.get(size) || 0;
          batchItem.shoeSizes.set(size, currentSizeCount + 1);
        } else {
          const currentSizeCount = batchItem.clothingSizes.get(size) || 0;
          batchItem.clothingSizes.set(size, currentSizeCount + 1);
        }

        // Increment the quantity property of the batchItem by 1
        batchItem.quantity = (batchItem.quantity || 0) + 1;

        await deleteItem(item._id);
      }
      await batchItem.save();
    }

    logger.info(`Processed ${lostItems.length} lost items.`);
  } catch (error) {
    console.error(error);
    logger.error(`Error processing lost items: ${error}`);
  }
};

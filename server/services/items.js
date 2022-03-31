const Item = require('../models/Item');

const createItem = async (data) => {
    console.log('create item service');
    console.log(data);
    try {
        const item = new Item(data)
        item.save(err=>{
            if (err) {
              throw Error(err);
            } else {
              return { success: true, message: 'Item created' }
            }
        })
    } catch (err) {
        console.error(err);
        return { success: false, message: err }
    }
};

const updateItem = async (id, updateData) => {
    console.log('update item service');
    try {
        const item = await Item.findByIdAndUpdate(id, updateData, { useFindAndModify: false });
        if (item) {
            return { success: true, message: 'Item updated' }
        } else {
          throw Error('Cannot update item');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};

const deleteItem = async (id) => {
    console.log('delete item service');
    try {
        const item = await Item.findByIdAndRemove(id, { useFindAndModify: false });
        if (item) {
            return { success: true, message: 'Item deleted' }
        } else {
          throw Error('Cannot delete item');
        }
    } catch (error) {
        console.error(`Error in deleteItem: ${error}`);
        return { success: false, message: `Error in deleteItem: ${error}` }
    }
};

const getAllItems = async () => {
    try {
      const items = await Item.find({"approvedStatus": "approved"}).lean();
      return items;
    } catch (error) {
      console.error(`Error in getAllItems: ${error}`);
      return { success: false, message: `Error in getAllItems: ${error}` }
    }
};

const getAccountNotificationItems = async (adminUserId) => {
  const pendingReceiveQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"sendVia": adminUserId},
      {"$or": [{"status": "shopped"}, {"status": "shipped-to-gyb"}]}
    ]
  };
  const pendingSentQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"sendVia": adminUserId},
      {"status": "received-by-gyb"}
    ]
  }

  try {
    const pendingReceive = await Item.find(pendingReceiveQuery).lean();
    const pendingSent = await Item.find(pendingSentQuery).lean();
    return [pendingReceive, pendingSent];
  } catch (error) {
    console.error(`Error in find items: ${error}`);
    return { success: false, message: `Error in find items: ${error}` }
  }
}

const getShopNotificationItems = async () => {
  const pendingAssignQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"sendVia": {$exists: false}},
    ]
  }
  const shoppedQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"kind": 'admin'},
    ]
  }

  try {
    const pendingAssign = await Item.find(pendingAssignQuery).populate({
      "path": "shopperId",
      "match": { "deliverPreference": "via gyb" }
    }).lean();
    const shopped = await Item.find(shoppedQuery).populate({
      "path": "donorId",
      "match": { "kind": "admin" }
    }).lean();

    return [pendingAssign, shopped];
  } catch (error) {
    console.error(`Error in get shop notifications: ${error}`);
    return { success: false, message: `Error in get shop notifications: ${error}` }
  }
}

const getItem = async (id) => {
    console.log('get item')
    try {
        const item = await Item.findById(id);
        if (item) {
            return item
        } else {
          throw Error('Cannot find item');
        }
      } catch (error) {
        console.error(`Error in getItem: ${error}`);
        return { success: false, message: `Error in getItem: ${error}` }
      }
};

module.exports = { 
    createItem,
    getItem,
    getAllItems,
    getAccountNotificationItems,
    getShopNotificationItems,
    deleteItem,
    updateItem
};
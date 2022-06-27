const Item = require('../models/Item');
const { cloudinary } = require('../utils/cloudinary');

const createItem = async (data) => {
    console.log('create item service');
    var new_photos = [];
    const promises = data.photos.map((photo) => {
      if (photo.status !== 'removed') {
        return cloudinary.uploader.upload(
           photo.thumbUrl,
           {
               resource_type: "auto",
               public_id: photo.uid,
               overwrite: false
           }).then((result) => {
               console.log("*** Success: Cloudinary Upload: ", result.url);
               new_photos.push({ url: result.url, name: photo.name, createdAt: result.created_at, publicId: photo.uid });
           }).catch((err) => {
               console.error(err);
               console.log("*** Error: Cloudinary Upload");
           });
      }
    });
    await Promise.all(promises)
    data.photos = new_photos;
    try {
      const item = new Item(data)
      let saveItem = await item.save();
      return { success: true, message: 'Item created', item: item }
    } catch (err) {
        console.error(err);
        return { success: false, message: err }
    }
};
//messages text and timestamp in the messages table . Use sendgrid.
const updateItem = async (id, updateData) => {
    var results = {}
    var new_photos = [];
    if (updateData.photos) {
        const promises = updateData.photos.map(async (photo) => {
        if (photo.status == 'removed' && photo.publicId) {
          return cloudinary.uploader.destroy(photo.publicId);
        } else if (!photo.url && photo.thumbUrl) {
          return cloudinary.uploader.upload(
            photo.thumbUrl,
            {
                resource_type: "auto",
                public_id: photo.uid,
                overwrite: false
            }).then((result) => {
                console.log("*** Success: Cloudinary Upload: ", result.url);
                new_photos.push({ url: result.url, name: photo.name, createdAt: result.created_at, publicId: photo.uid });
            }).catch((err) => {
                console.error(err);
                console.log("*** Error: Cloudinary Upload");
            });
        } else {
          new_photos.push(photo);
          return true
        }
      })
      await Promise.all(promises)
      updateData.photos = new_photos;
      try {
          const item = await Item.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
          if (item) {
                return {success: true, message: 'Item updated',  item: item}
          } else {
            throw Error('Cannot update item');
          }
      } catch (err) {
          console.log(err);
          return { success: false, message: err }
      }
    } else {
      delete updateData.photos;
      try {
        const item = await Item.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
        if (item) {
            results = { success: true, message: 'Item updated',  item: item }
        } else {
          throw Error('Cannot update item');
        }
    } catch (err) {
        console.log(err);
        results =  { success: false, message: err }
    }
    }
    return results;
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

const getDonorItems = async (userId, itemStatus) => {
  console.log('get donor items')
  var conditions = {}
  try {
    if (itemStatus !== '') {
      conditions = { 
        "$or": [{"approvedStatus": "approved"}, {"approvedStatus": "rejected"}],
        donorId: userId, 
        status: itemStatus
      }
    } else {
      conditions = { 
        approvedStatus: "approved",
        donorId: userId, 
        "$or": [{"status": "shopped"}, {"status": "shipped-to-gyb"}, {"status": "received-by-gyb"}, {"status": "shipped-to-shopper"}]
      }
    }
    var items = await Item.find(conditions).lean();
    return items;
  } catch (error) {
    console.error(`Error in getting donor items: ${error}`);
    return { success: false, message: `Error in getting donor items: ${error}` }
  }
}

const getShopperItems = async (userId) => {
  console.log('get shopper items')
  console.log(userId)
  try {
    const conditions = { 
      approvedStatus: 'approved', 
      shopperId: userId, 
      "$or": [{"status": "shopped"}, {"status": "shipped-to-gyb"}, {"status": "received-by-gyb"}, {"status": "shipped-to-shopper"}]
    };
    var items = await Item.find(conditions).lean();
    return items;
  } catch (error) {
    console.error(`Error in getting shopper items: ${error}`);
    return { success: false, message: `Error in getting shopper items: ${error}` }
  }
}

const getAdminItems = async (page, limit, isCurrent) => {
  //here type is current or past
  console.log('get admin items items')
  console.log(isCurrent)
  var conditions = {};
  const limiti = parseInt(limit);
  const pagei = parseInt(page);
  const skipIndex = (pagei - 1) * limiti;

  try {
    if (isCurrent) {
      conditions = { 
        approvedStatus: "approved",
        "$or": [{"status": "in-shop"}, {"status": "shopped"}, {"status": "shipped-to-gyb"}, {"status": "received-by-gyb"}, {"status": "shipped-to-shopper"}]
      }
    } else {
      conditions = { 
        status: 'received'
      }
    }
    var items = await Item.find(conditions)
      .sort({createdAt: -1})
      .limit(limiti)
      .skip(skipIndex)
      .exec();
    return items;
  } catch (error) {
    console.error(`Error in getting admin items: ${error}`);
    return { success: false, message: `Error in getting admin items: ${error}` }
  }
}

const getAllItems = async (page, limit, approvedStatus, itemStatus, category, subCategory, donorId, clothingSizes, shoeSizes, colours) => {
  console.log('getting alll items')
  try {
    const conditions = { approvedStatus: approvedStatus, status: itemStatus };
    const limiti = parseInt(limit);
    const pagei = parseInt(page);
    const skipIndex = (pagei - 1) * limiti;

    if(category) conditions.category = category;
    if(subCategory) conditions.subCategory = subCategory;
    if(donorId) conditions.donorId = donorId;
    if (clothingSizes) conditions.clothingSize = { $in: clothingSizes.split(',') }
    if (shoeSizes) conditions.shoeSize = { $in: shoeSizes.split(',') }
    if (colours) conditions.colors = { $in: colours.split(',') }

    console.log(conditions)
    var items = await Item.find(conditions)
      .sort({createdAt: -1})
      .limit(limiti)
      .skip(skipIndex)
      .exec();

    return items;
  } catch (error) {
    console.error(`Error in getting all items: ${error}`);
    return { success: false, message: `Error in getting all items: ${error}` }
  }
};


const getAccountNotificationItems = async (adminUserId) => {
  var results = [];

  const pendingReceiveQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"sendVia": {$exists: true}},
      {"$or": [{"status": "shopped"}, {"status": "shipped-to-gyb"}]}
    ]
  };
  const pendingSentQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"sendVia": {$exists: true}},
      {"status": "received-by-gyb"}
    ]
  }

  try {
    const pendingReceive = await Item.find(pendingReceiveQuery).populate({
      "path": "sendVia",
      "match": { "adminUser": adminUserId }
    });
    const pendingSent = await Item.find(pendingSentQuery).populate({
      "path": "sendVia",
      "match": { "adminUser": adminUserId }
    });

    results.push(pendingReceive.filter((i) => {
      return i.sendVia !== null
    }))
    results.push(pendingSent.filter((i) => {
      return i.sendVia !== null
    }))

    return results;
  } catch (error) {
    console.error(`Error in find items: ${error}`);
    return { success: false, message: `Error in find items: ${error}` }
  }
}

const getShopNotificationItems = async () => {
  var results = [];

  const pendingAssignQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"status": "shopped"},
      {"sendVia": null }
    ]
  }
  const shoppedQuery = {
    "$and": [
      {"approvedStatus": "approved"}, 
      {"status": "shopped"},
      {"sendVia": { $ne: null }}
    ]
  }

  try {
    var results = [];
    const pendingAssign = await Item.find(pendingAssignQuery).populate({
      "path": "shopperId",
      "match": { "deliveryPreference": "via-gyb" }
    });
    const shopped = await Item.find(shoppedQuery).populate({
      "path": "shopperId",
      "match": { "deliveryPreference": "via-gyb" }
    });

    results.push(pendingAssign.filter((i) => {
      return i.shopperId !== null
    }))
    results.push(shopped.filter((i) => {
      return i.shopperId !== null
    }))
    
    return results

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
    getShopperItems,
    getDonorItems,
    getAdminItems,
    getAccountNotificationItems,
    getShopNotificationItems,
    deleteItem,
    updateItem
};
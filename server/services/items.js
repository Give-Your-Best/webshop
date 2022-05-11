const Item = require('../models/Item');
const { cloudinary } = require('../utils/cloudinary');

const createItem = async (data) => {
    console.log('create item service');
    var new_photos = [];
    const promises = data.photos.map((photo) => {
      if (photo.status !== 'removed') {
        console.log(photo.uid)
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
    console.log(updateData)
    if (updateData.photos) {
        console.log('here')
        const promises = updateData.photos.map(async (photo) => {
        console.log(photo.status)
        if (photo.status == 'removed' && photo.publicId) {
          console.log('desroying')
          return cloudinary.uploader.destroy(photo.publicId);
        } else if (!photo.url && photo.thumbUrl) {
          console.log('uploading')
          console.log(photo.uid)
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
      console.log('sdg')
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

const getAllItems = async (approvedStatus, type, userId) => {
  try {
    if (type == 'donor') {
      //logic to only return items that have not been sent
      var items = await Item.find({ $or:[ {"approvedStatus": 'approved', donorId: userId}, {"approvedStatus": 'in-progress', donorId: userId} ]}).lean();
    } else if (type == "shopper") {
      //logic to only return ites that have not been received
      var items = await Item.find({"approvedStatus": approvedStatus, shopperId: userId}).lean();
    } else {
      var items = await Item.find({"approvedStatus": "approved"}).lean();
    }
    return items;
  } catch (error) {
    console.error(`Error in getAllitems: ${error}`);
    return { success: false, message: `Error in getAllitems: ${error}` }
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
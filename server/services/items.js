const Item = require('../models/Item');
const { cloudinary } = require('../utils/cloudinary');

const createItem = async (data) => {
  var new_photos = [];
  var success = true;
  const promises = data.photos.map((photo) => {
    if (photo.status !== 'removed') {
      return cloudinary.uploader
        .upload(photo.imageUrl, {
          resource_type: 'auto',
          public_id: photo.uid,
          overwrite: false,
          secure: true,
        })
        .then((result) => {
          console.log('*** Success: Cloudinary Upload: ', result.secure_url);
          new_photos.push({
            url: result.secure_url,
            name: photo.name,
            createdAt: result.created_at,
            publicId: photo.uid,
            success: true,
            front: photo.front ? true : false,
          });
        })
        .catch((err) => {
          console.error(err);
          console.log('*** Error: Cloudinary Upload');
          success = false;
          return;
        });
    }
  });
  await Promise.all(promises);
  if (!success) {
    return {
      success: false,
      message: 'Failed to upload one or more of your images',
    };
  }
  data.photos = new_photos;
  try {
    const item = new Item(data);
    let saveItem = await item.save();
    return { success: true, message: 'Item created', item: item };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};
//messages text and timestamp in the messages table . Use sendgrid.
const updateItem = async (id, updateData) => {
  var results = {};
  var new_photos = [];
  if (updateData.photos) {
    //if there are images to add to the item then upload to cloudianary and add cloudinary links to the update data
    const promises = updateData.photos.map(async (photo) => {
      if (photo.status == 'removed') {
        try {
          return cloudinary.uploader.destroy(photo.publicId);
        } catch (err) {
          return {};
        }
      } else if (!photo.url && photo.imageUrl) {
        return cloudinary.uploader
          .upload(photo.imageUrl, {
            resource_type: 'auto',
            public_id: photo.uid,
            overwrite: false,
            secure: true,
          })
          .then((result) => {
            console.log('*** Success: Cloudinary Upload: ', result.secure_url);
            new_photos.push({
              url: result.secure_url,
              name: photo.name,
              createdAt: result.created_at,
              publicId: photo.uid,
              front: photo.front ? true : false,
            });
          })
          .catch((err) => {
            console.error(err);
            console.log('*** Error: Cloudinary Upload');
          });
      } else if (Object.keys(photo).length) {
        new_photos.push(photo);
        return true;
      }
    });
    await Promise.all(promises);
    if (new_photos.length) {
      updateData.photos = new_photos;
    } else {
      delete updateData.photos;
    }
    try {
      const item = await Item.findOneAndUpdate({ _id: id }, updateData, {
        useFindAndModify: false,
        returnDocument: 'after',
      });
      if (item) {
        return { success: true, message: 'Item updated', item: item };
      } else {
        throw Error('Cannot update item');
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  } else {
    //if no new images to add then remove the empty photos list and continue updating
    delete updateData.photos;
    try {
      const item = await Item.findOneAndUpdate({ _id: id }, updateData, {
        useFindAndModify: false,
        returnDocument: 'after',
      });

      if (item) {
        results = { success: true, message: 'Item updated', item: item };
      } else {
        throw Error('Cannot update item');
      }
    } catch (err) {
      console.log(err);
      results = { success: false, message: err };
    }
  }
  return results;
};

const deleteItem = async (id) => {
  try {
    const item = await Item.findByIdAndRemove(id, { useFindAndModify: false });
    if (item) {
      return { success: true, message: 'Item deleted' };
    } else {
      throw Error('Cannot delete item');
    }
  } catch (error) {
    console.error(`Error in deleteItem: ${error}`);
    return { success: false, message: `Error in deleteItem: ${error}` };
  }
};

const getDonorItems = async (userId, itemStatus) => {
  var conditions = {};
  try {
    if (itemStatus !== '') {
      conditions = {
        $or: [
          { approvedStatus: 'approved' },
          { approvedStatus: 'in-progress' },
        ],
        donorId: userId,
        status: itemStatus,
      };
    } else {
      conditions = {
        approvedStatus: 'approved',
        donorId: userId,
        $or: [
          { status: 'shopped' },
          { status: 'shipped-to-gyb' },
          { status: 'received-by-gyb' },
          { status: 'shipped-to-shopper' },
        ],
      };
    }
    var items = await Item.find(conditions)
      .sort({ shopperId: -1 })
      .populate('shopperId')
      .exec();
    return items;
  } catch (error) {
    console.error(`Error in getting donor items: ${error}`);
    return {
      success: false,
      message: `Error in getting donor items: ${error}`,
    };
  }
};

const getShopperItems = async (userId, itemStatus) => {
  var conditions = {};
  try {
    if (itemStatus && itemStatus != 'undefined') {
      conditions = {
        approvedStatus: 'approved',
        shopperId: userId,
        status: itemStatus,
      };
    } else {
      conditions = {
        approvedStatus: 'approved',
        shopperId: userId,
        $or: [
          { status: 'shopped' },
          { status: 'shipped-to-gyb' },
          { status: 'received-by-gyb' },
          { status: 'shipped-to-shopper' },
        ],
      };
    }

    var items = await Item.find(conditions).lean();
    return items;
  } catch (error) {
    console.error(`Error in getting shopper items: ${error}`);
    return {
      success: false,
      message: `Error in getting shopper items: ${error}`,
    };
  }
};

const getAdminItems = async (isCurrent) => {
  //here type is current or past
  var conditions = {};

  try {
    if (isCurrent) {
      conditions = {
        approvedStatus: 'approved',
        $or: [
          { status: 'in-shop' },
          { status: 'shopped' },
          { status: 'shipped-to-gyb' },
          { status: 'received-by-gyb' },
          { status: 'shipped-to-shopper' },
        ],
      };
    } else {
      conditions = {
        status: 'received',
      };
    }
    var items = await Item.find(conditions)
      .sort({ createdAt: -1 })
      .populate('shopperId')
      .populate('donorId')
      .populate('tags')
      .exec();
    return items;
  } catch (error) {
    console.error(`Error in getting admin items: ${error}`);
    return {
      success: false,
      message: `Error in getting admin items: ${error}`,
    };
  }
};

const getAllItems = async (
  page,
  limit,
  approvedStatus,
  itemStatus,
  category,
  subCategory,
  donorId,
  clothingSizes,
  shoeSizes,
  colours
) => {
  let anHourAgo = new Date(new Date().getTime() - 1000 * 60 * 60);
  try {
    const conditions = {
      approvedStatus: approvedStatus,
      status: itemStatus,
      live: true,
      $or: [
        // if item not in basket or item in basket is more than an hour old
        { inBasket: null },
        { inBasket: false },
        {
          $and: [
            { 'statusUpdateDates.inBasketDate': { $lte: new Date(anHourAgo) } },
            { inBasket: true },
          ],
        },
      ],
    };
    const limiti = parseInt(limit);
    const pagei = parseInt(page);
    const skipIndex = (pagei - 1) * limiti;

    if (category) conditions.category = category;
    if (subCategory) conditions.subCategory = subCategory;
    if (donorId) conditions.donorId = donorId;
    if (clothingSizes)
      conditions.clothingSize = { $in: clothingSizes.split(',') };
    if (shoeSizes) conditions.shoeSize = { $in: shoeSizes.split(',') };
    if (colours) conditions.colors = { $in: colours.split(',') };

    var items = await Item.find(conditions)
      .sort({ createdAt: -1 })
      .limit(limiti)
      .skip(skipIndex)
      .exec();

    return items;
  } catch (error) {
    console.log(`Error in getting all items: ${error}`);
    return {
      success: false,
      message: `Error in getting all items: ${String(error)}`,
    };
  }
};

const getAccountNotificationItems = async (adminUserId) => {
  var results = [];

  const pendingReceiveQuery = {
    $and: [
      { approvedStatus: 'approved' },
      { sendVia: { $exists: true } },
      { $or: [{ status: 'shopped' }, { status: 'shipped-to-gyb' }] },
    ],
  };
  const pendingSentQuery = {
    $and: [
      { approvedStatus: 'approved' },
      { sendVia: { $exists: true } },
      { status: 'received-by-gyb' },
    ],
  };

  const pendingShopperReceivedQuery = {
    $and: [
      { approvedStatus: 'approved' },
      { sendVia: { $exists: true } },
      { status: 'shipped-to-shopper' },
    ],
  };

  try {
    const pendingReceive = await Item.find(pendingReceiveQuery)
      .populate({
        path: 'sendVia',
        match: { adminUser: adminUserId },
      })
      .populate('shopperId')
      .populate('donorId');
    const pendingSent = await Item.find(pendingSentQuery)
      .populate({
        path: 'sendVia',
        match: { adminUser: adminUserId },
      })
      .populate('shopperId')
      .populate('donorId');
    const pendingShopperReceived = await Item.find(pendingShopperReceivedQuery)
      .populate({
        path: 'sendVia',
        match: { adminUser: adminUserId },
      })
      .populate('shopperId')
      .populate('donorId');

    results.push(
      pendingReceive.filter((i) => {
        return i.sendVia !== null;
      })
    );
    results.push(
      pendingSent.filter((i) => {
        return i.sendVia !== null;
      })
    );
    results.push(
      pendingShopperReceived.filter((i) => {
        return i.sendVia !== null;
      })
    );

    return results;
  } catch (error) {
    console.error(`Error in find items: ${error}`);
    return { success: false, message: `Error in find items: ${error}` };
  }
};

const getShopNotificationItems = async () => {
  var results = [];

  const pendingAssignQuery = {
    $and: [
      { approvedStatus: 'approved' },
      { status: 'shopped' },
      { sendVia: null },
    ],
  };
  const shoppedQuery = {
    $and: [
      { approvedStatus: 'approved' },
      {
        $or: [
          { status: 'shopped' },
          { status: 'shipped-to-gyb' },
          { status: 'received-by-gyb' },
        ],
      },
      { sendVia: { $ne: null } },
    ],
  };

  try {
    var results = [];
    const pendingAssign = await Item.find(pendingAssignQuery)
      .populate({
        path: 'shopperId',
        match: { deliveryPreference: 'via-gyb' },
      })
      .populate('donorId');
    const shopped = await Item.find(shoppedQuery)
      .populate({
        path: 'shopperId',
        match: { deliveryPreference: 'via-gyb' },
      })
      .populate('donorId')
      .populate('sendVia');

    results.push(
      pendingAssign.filter((i) => {
        return i.shopperId !== null;
      })
    );
    results.push(
      shopped.filter((i) => {
        return i.shopperId !== null;
      })
    );

    return results;
  } catch (error) {
    console.error(`Error in get shop notifications: ${error}`);
    return {
      success: false,
      message: `Error in get shop notifications: ${error}`,
    };
  }
};

const getItem = async (id) => {
  try {
    const item = await Item.findById(id);
    if (item) {
      return item;
    } else {
      throw Error('Cannot find item');
    }
  } catch (error) {
    console.error(`Error in getItem: ${error}`);
    return { success: false, message: `Error in getItem: ${error}` };
  }
};

const deleteDonorItems = async (id) => {
  if (!id || id === '') {
    throw Error('No donor id provided');
  }
  try {
    const item = await Item.findOneAndDelete(
      { donorId: id },
      { useFindAndModify: false }
    );
    if (item) {
      return { success: true, message: 'Donor items deleted' };
    } else {
      throw Error('Cannot delete donor items');
    }
  } catch (error) {
    console.error(`Error in delete donor items: ${error}`);
    return { success: false, message: `Error in delete donor items: ${error}` };
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
  deleteDonorItems,
  updateItem,
};

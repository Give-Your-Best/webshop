const { ObjectId } = require('bson');
const moment = require('moment');
const Item = require('../models/Item');
const User_ = require('../models/User');
const Location = require('../models/Location');
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
    await item.save();
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

// There is now proper pagination on this endpoint as the quantity of results
// combined with aggregations is resulting in timeouts...
const getAdminItems = async ({
  isCurrent = true,
  withCount = true,
  limit = 10,
  page = 1,
  donor = undefined,
  shopper = undefined,
  category = undefined,
  status = undefined,
  sort = undefined,
}) => {
  const lim = parseInt(limit);
  const pge = parseInt(page);

  var conditions = {};

  try {
    if (isCurrent) {
      // Statuses comprising 'current' items
      const defaultStatus = [
        'in-shop',
        'shopped',
        'shipped-by-gyb',
        'received-by-gyb',
        'shipped-to-shopper',
      ];
      // all current items must be approved
      const $and = [{ approvedStatus: 'approved' }];
      // Apply either the statuses prvided by the client or the defaults
      if (status) {
        $and.push({
          $or: status.split(',').map((s) => ({ status: s })),
        });
      } else {
        $and.push({
          $or: defaultStatus.map((s) => ({ status: s })),
        });
      }
      // Apply categories if provided by the client
      if (category) {
        $and.push({
          $or: category.split(',').map((c) => ({ category: c })),
        });
      }
      conditions = { $and };
    } else {
      // Past items are items that are confirmed received
      conditions = {
        status: 'received',
      };
      // Apply categories if provided by the client
      if (category) {
        conditions.$or = category.split(',').map((c) => ({ category: c }));
      }
    }

    // Apply the donor or shopper id if any
    if (donor) {
      conditions.donorId = new ObjectId(donor);
    } else if (shopper) {
      conditions.shopperId = new ObjectId(shopper);
    }

    // Default sort most recent items
    let sortBy = { createdAt: -1 };

    // Prepend sort config from the client if any
    if (sort) {
      const [field, dir] = sort.split(':');

      const map = {
        ascend: -1,
        descend: 1,
      };

      sortBy = {
        [field]: map[dir],
        createdAt: -1,
      };
    }

    // We only want to calculate the count when the view/filters etc. change,
    // not for pagination update queries...
    const count = withCount ? await Item.countDocuments(conditions) : undefined;

    var items = await Item.find(conditions)
      .sort(sortBy)
      .limit(lim)
      .skip((pge - 1) * lim)
      .populate('shopperId')
      .populate('donorId')
      .populate('tags')
      .exec();

    return {
      count,
      items,
    };
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
  try {
    // We only care about items assigned to the current admin user
    const locationId = await Location.find(
      {
        adminUser: adminUserId,
      },
      '_id'
    ).lean();

    const condition = {
      $and: [
        { approvedStatus: 'approved' },
        { sendVia: locationId },
        {
          status: {
            $in: [
              'shopped',
              'shipped-to-gyb',
              'received-by-gyb',
              'shipped-to-shopper',
            ],
          },
        },
      ],
    };

    const data = await Item.find(condition)
      .populate('shopperId')
      .populate('donorId')
      .populate('sendVia')
      .lean();

    const result = [].concat(...data).reduce(
      (acc, cur) => {
        if (cur.status === 'shipped-to-shopper') {
          // Items dispatched to shopper and awaiting confirmation of receipt
          acc[2].push(cur);
        } else if (cur.status === 'received-by-gyb') {
          // Items received from donor and awaiting dispatch
          acc[1].push(cur);
        } else {
          // Items not yet received from donor
          acc[0].push(cur);
        }

        return acc;
      },
      [[], [], []]
    );

    return result;
  } catch (error) {
    console.error(`Error in get account notifications: ${error}`);
    return {
      success: false,
      message: `Error in get account notifications: ${error}`,
    };
  }
};

const getShopNotificationItems = async () => {
  try {
    // We only care about items where shopper requires dispatch via GYB
    const shopperIds = await User_.Shopper.find(
      {
        deliveryPreference: 'via-gyb',
      },
      '_id'
    ).lean();

    const condition = {
      $and: [
        { approvedStatus: 'approved' },
        { status: { $in: ['shopped', 'shipped-to-gyb', 'received-by-gyb'] } },
        { shopperId: { $in: shopperIds } },
      ],
    };

    const data = await Item.find(condition)
      .populate('shopperId')
      .populate('donorId')
      .populate('sendVia')
      .lean();

    const result = [].concat(...data).reduce(
      (acc, cur) => {
        if (cur.status === 'shopped' && cur.sendVia === undefined) {
          // Items not yet assigned an administrator to handle shipping
          acc[0].push(cur);
        } else {
          // Items assigned and awaiting progress update from donor/shopper
          acc[1].push(cur);
        }

        return acc;
      },
      [[], []]
    );

    return result;
  } catch (error) {
    console.error(`Error in get shop notifications: ${error}`);
    return {
      success: false,
      message: `Error in get shop notifications: ${error}`,
    };
  }
};

const getStatusReminderItems = async ({ delta, status, kind }) => {
  try {
    // Formatted date relative to now
    const date = moment().subtract(delta, 'days').format('YYYY-MM-DD');

    // Status is 'shopped' and shopped date is exactly `delta` days ago...
    const condition = {
      status,
      approvedStatus: 'approved',
      $expr: {
        $eq: [
          date,
          {
            $dateToString: {
              date: '$statusUpdateDates.shoppedDate',
              format: '%Y-%m-%d',
            },
          },
        ],
      },
    };

    const items = await Item.find(condition).lean();

    // Group items under target user reference id
    const result = items.reduce((acc, cur) => {
      const key = cur[`${kind}Id`];

      acc[key] = acc[key] || [];
      acc[key].push(cur);

      return acc;
    }, {});

    return result;
  } catch (error) {
    console.error(`Error in get status reminder items: ${error}`);
    return {
      success: false,
      message: `Error in get status reminder items: ${error}`,
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
  getStatusReminderItems,
  getShopNotificationItems,
  deleteItem,
  deleteDonorItems,
  updateItem,
};

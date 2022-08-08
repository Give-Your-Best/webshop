const Item = require('../models/Item');
const User_ = require('../models/User');

const getAllStatistics = async () => {
  console.log('service to pull all stats');
  const now = new Date();
  var sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  var thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDays = new Date(sevenDaysAgo.getFullYear(), sevenDaysAgo.getMonth(), sevenDaysAgo.getDate());
  const month = new Date(thirtyDaysAgo.getFullYear(), thirtyDaysAgo.getMonth(), thirtyDaysAgo.getDate());
  var statistics = {};

  try {
    statistics['ordersToday'] = await Item.countDocuments({
      'statusUpdateDates.shoppedDate': {
        $gte: today
      },
      'approvedStatus': 'approved'
    });
    statistics['donationsToday'] = await Item.countDocuments({
      'createdAt': {
        $gte: today
      }
    });
    statistics['itemsInShop'] = await Item.countDocuments({
      'status': 'in-shop',
      'approvedStatus': 'approved'
    });

    const donorData = await User_.Donor.aggregate(
      [
          { "$group": {
              "_id": 'donor',
              "total": { "$sum": 1 },
              "today": { "$sum": { "$cond": [ { $gte: [ "$createdAt", today ] }, 1, 0 ] } },
              "thisWeek": { "$sum": { "$cond": [ { $gte: [ "$createdAt", sevenDays ] }, 1, 0 ] } },
              "thisMonth": { "$sum": { "$cond": [ { $gte: [ "$createdAt", month ] }, 1, 0 ] } }
          }}
      ]
    );
    const shopperData = await User_.Shopper.aggregate(
      [
          { "$group": {
              "_id": 'shopper',
              "total": { "$sum": 1 },
              "today": { "$sum": { "$cond": [ { $gte: [ "$createdAt", today ] }, 1, 0 ] } },
              "thisWeek": { "$sum": { "$cond": [ { $gte: [ "$createdAt", sevenDays ] }, 1, 0 ] } },
              "thisMonth": { "$sum": { "$cond": [ { $gte: [ "$createdAt", month ] }, 1, 0 ] } }
          }}
      ]
    );

    statistics['usersChart'] = []
    statistics['usersChart'].push(donorData[0], shopperData[0])

    const itemsDonatedData = await Item.aggregate(
      [
          { "$group": {
              "_id": 'donated',
              "total": { "$sum": 1 },
              "today": { "$sum": { "$cond": [ { $gte: [ "$createdAt", today ] }, 1, 0 ] } },
              "thisWeek": { "$sum": { "$cond": [ { $gte: [ "$createdAt", sevenDays ] }, 1, 0 ] } },
              "thisMonth": { "$sum": { "$cond": [ { $gte: [ "$createdAt", month ] }, 1, 0 ] } }
          }}
      ]
    );

    const statuses = ["shopped", "shipped-to-gyb", "received-by-gyb", "shipped-to-shopper", "received"]
    const itemsShoppedData = await Item.aggregate(
      [
          { "$group": {
              "_id": 'shopped',
              "total": { "$sum": { "$cond": [ { $in: [ "$status", statuses ] }, 1, 0 ] } },
              "today": { "$sum": { "$cond": [ { $gte: [ "$statusUpdateDates.shoppedDate", today ] }, 1, 0 ] } },
              "thisWeek": { "$sum": { "$cond": [ { $gte: [ "$statusUpdateDates.shoppedDate", sevenDays ] }, 1, 0 ] } },
              "thisMonth": { "$sum": { "$cond": [ { $gte: [ "$statusUpdateDates.shoppedDate", month ] }, 1, 0 ] } },
          }}
      ]
    );

    statistics['itemsChart'] = []
    statistics['itemsChart'].push(itemsDonatedData[0], itemsShoppedData[0])
  
    return statistics;
  } catch (error) {
    console.error(`Error in get all statistics: ${error}`);
    return { success: false, message: `Error in get all statistics: ${error}` }
  }
};

module.exports = { 
  getAllStatistics
};
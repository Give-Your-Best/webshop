const Item = require('../models/Item');
const User_ = require('../models/User');

const getReportData = async (from, to) => {

  //get dates with time 0
  var fromDate = new Date(new Date(from).getFullYear(), new Date(from).getMonth(), new Date(from).getDate());
  var toDate = new Date(new Date(to).getFullYear(), new Date(to).getMonth(), new Date(to).getDate());

  var reportData = {}
  //shopped statuses
  const statuses = ["shopped", "shipped-to-gyb", "received-by-gyb", "shipped-to-shopper", "received"];

  try {

    //run queries to pull data with date restrictions
    if (from && to) {

      const shoppers = await User_.User.find({approvedStatus: 'approved', kind: 'shopper', createdAt: {$gt:fromDate, $lt:toDate }}).populate('shoppedItems');
      reportData['shopperCount'] = shoppers.length;
      reportData['shopperConvertedCount'] = shoppers.filter((s) => s.shoppedItems > 0).length;
      reportData['shopperCountWithAdditional'] = shoppers.reduce((a, s) => a + s.shoppingFor, 0);
  
      const donors = await User_.User.find({approvedStatus: 'approved', kind: 'donor', createdAt: {$gt:fromDate, $lt:toDate }}).populate('donatedItems');
      reportData['donorCount'] = donors.length;
      reportData['donorConvertedCount'] = donors.filter((d) => d.donatedItems > 0).length;
  
      const items = await Item.find({createdAt: {$gt:fromDate, $lt:toDate }});
      const itemsShopped = await Item.find({'statusUpdateDates.shoppedDate': {$gt:fromDate, $lt:toDate }, status: { $in: statuses } });
      reportData['itemsCount'] = items.length;
      reportData['itemsShopped'] = itemsShopped.length;


      const groupTypes = ['category', 'subCategory', 'clothingSize', 'shoeSize', 'tags'];

      for (const g of groupTypes) {
        let group = (g !== 'tags')? '$' + g: '$tag.name';
        let d =  await Item.aggregate(
          [
              {
                "$unwind": '$' + g,
              },
              { "$lookup": {
                "from": "tags",
                "localField": "tags",
                "foreignField": "_id",
                "as": "tag"
              }},
              { "$lookup": {
                "from": "users",
                "localField": "shopperId",
                "foreignField": "_id",
                "as": "shopper"
              }},
              { "$group": {
                  "_id": group,
                  "total": { "$sum": { "$cond": [ {$and : [ { $eq: [ "$approvedStatus", 'approved'] }, { $gte: [ "$createdAt", fromDate ] }, { $lt: [ "$createdAt", toDate ] }] }, 1, 0]}},
                  "shopped": { "$sum": { "$cond": [ {$and : [ { $eq: [ "$approvedStatus", 'approved'] }, { $in: [ "$status", statuses] }, { $gte: [ "$statusUpdateDates.shoppedDate", fromDate ] }, { $lt: [ "$statusUpdateDates.shoppedDate", toDate ] }] }, 1, 0]}},
                  "shopperUnique": { 
                    "$addToSet": { 
                        "shopperFirstName":{ "$cond": [ {$and : [ { $gte: [ "$statusUpdateDates.shoppedDate", fromDate ] }, { $lt: [ "$statusUpdateDates.shoppedDate", toDate ] }, { $in: [ "$status", statuses] }] }, "$shopper.firstName", '' ] },
                        "shopperLastName":{ "$cond": [ {$and : [ { $gte: [ "$statusUpdateDates.shoppedDate", fromDate ] }, { $lt: [ "$statusUpdateDates.shoppedDate", toDate ] }, { $in: [ "$status", statuses] }] }, "$shopper.lastName", '' ] },
                    }
                  }
              }},
              {
                "$sort": {"_id": 1}
              }
          ]
        ).collation({locale:"en_US", numericOrdering:true});
        reportData[g] = d;
      }

    //run queries to pull data with no date restrictions (all data)
    } else {

      const shoppers = await User_.User.find({approvedStatus: 'approved', kind: 'shopper'}).populate('shoppedItems');
      reportData['shopperCount'] = shoppers.length;

      reportData['shopperConvertedCount'] = shoppers.filter((s) => s.shoppedItems > 0).length;
      reportData['shopperConvertedCountWithAdditional'] = shoppers.reduce((a, s) =>  a + ((s.shoppedItems > 0)? s.shoppingFor: 0), 0);
      reportData['shopperCountWithAdditional'] = shoppers.reduce((a, s) => a + s.shoppingFor, 0);
  
      const donors = await User_.User.find({approvedStatus: 'approved', kind: 'donor'}).populate('donatedItems');
      reportData['donorCount'] = donors.length;
      reportData['donorConvertedCount'] = donors.filter((d) => d.donatedItems > 0).length;
  
      const items = await Item.find({});
      const itemsShopped = await Item.find({status: { $in: ["shopped", "shipped-to-gyb", "received-by-gyb", "shipped-to-shopper", "received"] } });
      reportData['itemsCount'] = items.length;
      reportData['itemsShopped'] = itemsShopped.length;
      reportData['uniqueShoppers'] = reportData['shopperConvertedCount'];

      const groupTypes = ['category', 'subCategory', 'clothingSize', 'shoeSize', 'tags'];

      for (const g of groupTypes) {
        let group = (g !== 'tags')? '$' + g: '$tag.name';
        let d =  await Item.aggregate(
          [
              {
                "$unwind": '$' + g,
              },
              { "$lookup": {
                "from": "tags",
                "localField": "tags",
                "foreignField": "_id",
                "as": "tag"
              }},
              { "$lookup": {
                "from": "users",
                "localField": "shopperId",
                "foreignField": "_id",
                "as": "shopper"
              }},
              { "$group": {
                  "_id": group,
                  "total": { "$sum": { "$cond": [ { $eq: [ "$approvedStatus", 'approved' ] }, 1, 0 ] } },
                  "shopped": { "$sum": { "$cond": [ { $in: [ "$status", statuses ] }, 1, 0 ] } },
                  "available": { "$sum": { "$cond": [ {$and : [ { $eq: [ "$approvedStatus", 'approved'] }, { $eq: [ "$status","in-shop"] }] }, 1, 0]}},
                  "shopperUnique": { 
                    "$addToSet": { 
                        "shopperFirstName":{ "$cond": [ {$and : [ { $eq: [ "$approvedStatus", 'approved'] }, { $in: [ "$status", statuses] }] }, "$shopper.firstName", ''] },
                        "shopperLastName":{ "$cond": [ {$and : [ { $eq: [ "$approvedStatus", 'approved'] }, { $in: [ "$status", statuses] }] }, "$shopper.lastName", ''] },
                    }
                  }
              }},
              {
                "$sort": {"_id": 1}
              }
          ]
        ).collation({locale:"en_US", numericOrdering:true});
        reportData[g] = d;
      }

    }

    return { success: true, data: reportData };
  } catch (error) {
    console.error(`Error in getting report data: ${error}`);
    return { success: false, message: `Error in getting report data: ${error}` }
  }
}

const getAllStatistics = async () => {
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
  getAllStatistics,
  getReportData
};
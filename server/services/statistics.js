const Item = require('../models/Item');
const BatchItem = require('../models/BatchItem');
const User_ = require('../models/User');

async function aggregateBatchItemGroupData(fromDate, toDate, batchResults) {
  // Aggregate batch item data
  const batchGroupTypes = [
    'category',
    'subCategory',
    'clothingSizes',
    'shoeSizes',
    'tags',
  ];

  for (const groupType of batchGroupTypes) {
    let pipeline = [];

    // add the date range condition to the pipeline only if fromDate and toDate are provided
    if (fromDate && toDate) {
      pipeline.push({
        $match: {
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        },
      });
    }

    // Define the group stage
    let groupStage = {
      $group: {
        _id: null, // This will be updated later
        total: {
          $sum: '$quantity',
        },
      },
    };

    // add the available field to the groupStage only if fromDate and toDate are not provided
    if (!fromDate && !toDate) {
      groupStage.$group.available = {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ['$approvedStatus', 'approved'] },
                { $eq: ['$status', 'in-shop'] },
              ],
            },
            1,
            0,
          ],
        },
      };
    }

    if (groupType === 'category' || groupType === 'subCategory') {
      groupStage.$group._id = '$templateItem.' + groupType;

      pipeline.push(
        {
          $lookup: {
            from: 'items',
            localField: 'templateItem',
            foreignField: '_id',
            as: 'templateItem',
          },
        },
        {
          $unwind: '$templateItem',
        },
        {
          $unwind: '$templateItem.' + groupType,
        },
        groupStage,
        {
          $sort: { _id: 1 },
        }
      );
    } else if (groupType === 'tags') {
      groupStage.$group._id = '$tag.name';

      pipeline.push(
        {
          $lookup: {
            from: 'items',
            localField: 'templateItem',
            foreignField: '_id',
            as: 'templateItem',
          },
        },
        {
          $unwind: '$templateItem',
        },
        {
          $unwind: '$templateItem.' + groupType,
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'templateItem.tags',
            foreignField: '_id',
            as: 'tag',
          },
        },
        {
          $unwind: '$tag',
        },
        groupStage,
        {
          $sort: { _id: 1 },
        }
      );
    } else {
      groupStage.$group._id = {
        $replaceAll: {
          input: '$sizes.k',
          find: '_',
          replacement: '.',
        },
      };

      groupStage.$group.total = {
        $sum: '$sizes.v',
      };

      pipeline.push(
        {
          $project: {
            sizes: { $objectToArray: `$${groupType}` },
          },
        },
        {
          $unwind: '$sizes',
        },
        groupStage,
        {
          $sort: { _id: 1 },
        }
      );
    }

    batchResults[groupType] = await BatchItem.aggregate(pipeline).collation({
      locale: 'en_US',
      numericOrdering: true,
    });
  }
}

async function aggregateItemGroupData(fromDate, toDate, statuses, reportData) {
  // grouped item data for each type
  const groupTypes = [
    'category',
    'subCategory',
    'clothingSize',
    'shoeSize',
    'tags',
  ];

  for (const g of groupTypes) {
    let group = g !== 'tags' ? '$' + g : '$tag.name';

    let groupStage = {
      $group: {
        _id: group,
        total: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$approvedStatus', 'approved'] },
                  fromDate && toDate ? { $gte: ['$createdAt', fromDate] } : {},
                  fromDate && toDate ? { $lt: ['$createdAt', toDate] } : {},
                ],
              },
              1,
              0,
            ],
          },
        },
        shopped: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$approvedStatus', 'approved'] },
                  { $in: ['$status', statuses] },
                  fromDate && toDate
                    ? { $gte: ['$statusUpdateDates.shoppedDate', fromDate] }
                    : {},
                  fromDate && toDate
                    ? { $lt: ['$statusUpdateDates.shoppedDate', toDate] }
                    : {},
                ],
              },
              1,
              0,
            ],
          },
        },
        shopperUnique: {
          $addToSet: {
            shopperFirstName: {
              $cond: [
                {
                  $and: [
                    fromDate && toDate
                      ? {
                          $gte: ['$statusUpdateDates.shoppedDate', fromDate],
                        }
                      : {},
                    fromDate && toDate
                      ? { $lt: ['$statusUpdateDates.shoppedDate', toDate] }
                      : {},
                    { $in: ['$status', statuses] },
                  ],
                },
                '$shopper.firstName',
                '',
              ],
            },
            shopperLastName: {
              $cond: [
                {
                  $and: [
                    fromDate && toDate
                      ? {
                          $gte: ['$statusUpdateDates.shoppedDate', fromDate],
                        }
                      : {},
                    fromDate && toDate
                      ? { $lt: ['$statusUpdateDates.shoppedDate', toDate] }
                      : {},
                    { $in: ['$status', statuses] },
                  ],
                },
                '$shopper.lastName',
                '',
              ],
            },
          },
        },
      },
    };

    // add the available field to the groupStage only if fromDate and toDate are not provided
    if (!fromDate && !toDate) {
      groupStage.$group.available = {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ['$approvedStatus', 'approved'] },
                { $eq: ['$status', 'in-shop'] },
              ],
            },
            1,
            0,
          ],
        },
      };
    }

    let pipeline = [
      // exclude batch-template items
      {
        $match: {
          $or: [
            { batchId: { $exists: false } },
            { isTemplateBatchItem: false },
          ],
        },
      },
      {
        $unwind: '$' + g,
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tag',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'shopperId',
          foreignField: '_id',
          as: 'shopper',
        },
      },
      groupStage,
      {
        $sort: { _id: 1 },
      },
    ];

    let d = await Item.aggregate(pipeline).collation({
      locale: 'en_US',
      numericOrdering: true,
    });

    reportData[g] = d;
  }
}

// merge the results from batchItems with the Items data
function updateReportData(batchResults, reportData, dateFrom, dateTo) {
  // a mapping object to map the plural keys in batchResults to the singular keys in reportData [e.g. clothingSizes -> clothingSize]
  const keyMapping = {
    category: 'category',
    subCategory: 'subCategory',
    clothingSizes: 'clothingSize',
    shoeSizes: 'shoeSize',
    tags: 'tags',
  };

  for (const key in batchResults) {
    const reportKey = keyMapping[key];
    for (const result of batchResults[key]) {
      let reportItem = reportData[reportKey].find((i) => i._id === result._id);
      if (reportItem) {
        reportItem.total += result.total;
        if (!dateFrom && !dateTo) {
          reportItem.available += result.total;
        }
      } else {
        const newItem = {
          _id: result._id,
          total: result.total,
          shopped: 0,
          shopperUnique: [
            {
              shopperFirstName: '',
              shopperLastName: '',
            },
          ],
        };
        if (!dateFrom && !dateTo) {
          newItem.available = result.total;
        }
        reportData[reportKey].push(newItem);
      }
    }
  }
}

const getReportData = async (from, to) => {
  //get dates with time 0
  var fromDate = new Date(
    new Date(from).getFullYear(),
    new Date(from).getMonth(),
    new Date(from).getDate()
  );
  var toDate = new Date(
    new Date(to).getFullYear(),
    new Date(to).getMonth(),
    new Date(to).getDate()
  );

  var reportData = {};
  //shopped statuses
  const statuses = [
    'shopped',
    'shipped-to-gyb',
    'received-by-gyb',
    'shipped-to-shopper',
    'received',
  ];

  try {
    //run queries to pull data with date restrictions
    if (from && to) {
      //general shopper and donor counts
      const shoppers = await User_.User.find({
        approvedStatus: 'approved',
        kind: 'shopper',
        createdAt: { $gt: fromDate, $lt: toDate },
      }).populate('shoppedItems');
      reportData['shopperCount'] = shoppers.length;
      reportData['shopperConvertedCount'] = shoppers.filter(
        (s) => s.shoppedItems > 0
      ).length;
      reportData['shopperConvertedCountWithAdditional'] = shoppers.reduce(
        (a, s) =>
          a + (s.shoppedItems > 0 ? s.shoppingFor + s.shoppingForChildren : 0),
        0
      );
      reportData['shopperCountWithAdditional'] = shoppers.reduce(
        (a, s) => a + s.shoppingFor + s.shoppingForChildren,
        0
      );

      const donors = await User_.User.find({
        approvedStatus: 'approved',
        kind: 'donor',
        createdAt: { $gt: fromDate, $lt: toDate },
      }).populate('donatedItems');
      reportData['donorCount'] = donors.length;
      reportData['donorConvertedCount'] = donors.filter(
        (d) => d.donatedItems > 0
      ).length;

      //general item counts
      const items = await Item.find({
        $and: [
          {
            $or: [{ batchId: null }, { isTemplateBatchItem: false }],
          },
          {
            createdAt: { $gt: fromDate, $lt: toDate },
          },
        ],
      });
      const itemsShopped = await Item.find({
        'statusUpdateDates.shoppedDate': { $gt: fromDate, $lt: toDate },
        status: { $in: statuses },
      });
      // count batch items' quantities
      const batchItems = await BatchItem.aggregate([
        {
          $match: {
            createdAt: { $gte: fromDate, $lt: toDate },
          },
        },
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: '$quantity' },
          },
        },
      ]).exec();

      reportData['itemsCount'] =
        items.length + batchItems?.[0]?.totalQuantity || 0;
      reportData['itemsShopped'] = itemsShopped.length;

      await aggregateItemGroupData(fromDate, toDate, statuses, reportData);

      let batchResults = {};
      await aggregateBatchItemGroupData(fromDate, toDate, batchResults);

      updateReportData(batchResults, reportData, fromDate, toDate);
      //run queries to pull data with no date restrictions (all data)
    } else {
      //general shopper and donor counts
      const shoppers = await User_.User.find({
        approvedStatus: 'approved',
        kind: 'shopper',
      }).populate('shoppedItems');
      reportData['shopperCount'] = shoppers.length;

      reportData['shopperConvertedCount'] = shoppers.filter(
        (s) => s.shoppedItems > 0
      ).length;
      reportData['shopperConvertedCountWithAdditional'] = shoppers.reduce(
        (a, s) =>
          a + (s.shoppedItems > 0 ? s.shoppingFor + s.shoppingForChildren : 0),
        0
      );
      reportData['shopperCountWithAdditional'] = shoppers.reduce(
        (a, s) => a + s.shoppingFor + s.shoppingForChildren,
        0
      );

      const donors = await User_.User.find({
        approvedStatus: 'approved',
        kind: 'donor',
      }).populate('donatedItems');
      reportData['donorCount'] = donors.length;
      reportData['donorConvertedCount'] = donors.filter(
        (d) => d.donatedItems > 0
      ).length;

      //general item counts
      const items = await Item.find({
        $or: [{ batchId: null }, { isTemplateBatchItem: false }],
      });
      const itemsShopped = await Item.find({
        status: {
          $in: [
            'shopped',
            'shipped-to-gyb',
            'received-by-gyb',
            'shipped-to-shopper',
            'received',
          ],
        },
      });
      // count all batch items' quantities
      const batchItems = await BatchItem.aggregate([
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: '$quantity' },
          },
        },
      ]).exec();
      reportData['itemsCount'] =
        items.length + batchItems?.[0]?.totalQuantity || 0;
      reportData['itemsShopped'] = itemsShopped.length;
      reportData['uniqueShoppers'] = reportData['shopperConvertedCount'];

      // call with null arguments to ignore the date-range filter
      await aggregateItemGroupData(null, null, statuses, reportData);

      // call with null arguments to ignore the date-range filter
      let batchResults = {};
      await aggregateBatchItemGroupData(null, null, batchResults);

      updateReportData(batchResults, reportData, null, null);
    }
    return { success: true, data: reportData };
  } catch (error) {
    console.error(`Error in getting report data: ${error}`);
    return {
      success: false,
      message: `Error in getting report data: ${error}`,
    };
  }
};

const getAllStatistics = async () => {
  const now = new Date();
  var sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  var thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDays = new Date(
    sevenDaysAgo.getFullYear(),
    sevenDaysAgo.getMonth(),
    sevenDaysAgo.getDate()
  );
  const month = new Date(
    thirtyDaysAgo.getFullYear(),
    thirtyDaysAgo.getMonth(),
    thirtyDaysAgo.getDate()
  );
  var statistics = {};

  try {
    statistics['ordersToday'] = await Item.countDocuments({
      'statusUpdateDates.shoppedDate': {
        $gte: today,
      },
      approvedStatus: 'approved',
      $or: [{ batchId: null }, { isTemplateBatchItem: false }],
    });
    statistics['donationsToday'] = await Item.countDocuments({
      createdAt: {
        $gte: today,
      },
      $or: [{ batchId: null }, { isTemplateBatchItem: false }],
    });
    statistics['itemsInShop'] = await Item.countDocuments({
      status: 'in-shop',
      approvedStatus: 'approved',
      $or: [{ batchId: null }, { isTemplateBatchItem: false }],
    });

    // add the batch counts to the above statistics
    // batch item donations today
    const batchDonationsToday = await BatchItem.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]).exec();
    statistics['donationsToday'] +=
      batchDonationsToday?.[0]?.totalQuantity || 0;

    // bath items in shop today
    const batchItemsInShop = await BatchItem.aggregate([
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]).exec();
    statistics['itemsInShop'] += batchItemsInShop?.[0]?.totalQuantity || 0;

    const donorData = await User_.Donor.aggregate([
      {
        $group: {
          _id: 'donor',
          total: { $sum: 1 },
          today: { $sum: { $cond: [{ $gte: ['$createdAt', today] }, 1, 0] } },
          thisWeek: {
            $sum: { $cond: [{ $gte: ['$createdAt', sevenDays] }, 1, 0] },
          },
          thisMonth: {
            $sum: { $cond: [{ $gte: ['$createdAt', month] }, 1, 0] },
          },
        },
      },
    ]);

    const shopperData = await User_.Shopper.aggregate([
      {
        $group: {
          _id: 'shopper',
          total: {
            $sum: { $cond: [{ $eq: ['$approvedStatus', 'approved'] }, 1, 0] },
          },
          today: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$approvedStatus', 'approved'] },
                    { $gte: ['$createdAt', today] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          thisWeek: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$approvedStatus', 'approved'] },
                    { $gte: ['$createdAt', sevenDays] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          thisMonth: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$approvedStatus', 'approved'] },
                    { $gte: ['$createdAt', month] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    statistics['usersChart'] = [];
    statistics['usersChart'].push(donorData[0], shopperData[0]);

    const itemsDonatedData = await Item.aggregate([
      {
        $match: {
          $or: [{ batchId: null }, { isTemplateBatchItem: false }],
        },
      },
      {
        $group: {
          _id: 'donated',
          total: { $sum: 1 },
          today: { $sum: { $cond: [{ $gte: ['$createdAt', today] }, 1, 0] } },
          thisWeek: {
            $sum: { $cond: [{ $gte: ['$createdAt', sevenDays] }, 1, 0] },
          },
          thisMonth: {
            $sum: { $cond: [{ $gte: ['$createdAt', month] }, 1, 0] },
          },
        },
      },
    ]);

    const batchItemsDonatedData = await BatchItem.aggregate([
      {
        $group: {
          _id: 'donated',
          total: { $sum: '$quantity' },
          today: {
            $sum: { $cond: [{ $gte: ['$createdAt', today] }, '$quantity', 0] },
          },
          thisWeek: {
            $sum: {
              $cond: [{ $gte: ['$createdAt', sevenDays] }, '$quantity', 0],
            },
          },
          thisMonth: {
            $sum: { $cond: [{ $gte: ['$createdAt', month] }, '$quantity', 0] },
          },
        },
      },
    ]);

    const safeSum = (a, b) => (a || 0) + (b || 0);

    // Sum up the values for batchItem and item aggregations
    const summedDonationData = {
      _id: 'donated',
      total: safeSum(
        itemsDonatedData[0]?.total,
        batchItemsDonatedData[0]?.total
      ),
      today: safeSum(
        itemsDonatedData[0]?.today,
        batchItemsDonatedData[0]?.today
      ),
      thisWeek: safeSum(
        itemsDonatedData[0]?.thisWeek,
        batchItemsDonatedData[0]?.thisWeek
      ),
      thisMonth: safeSum(
        itemsDonatedData[0]?.thisMonth,
        batchItemsDonatedData[0]?.thisMonth
      ),
    };

    const statuses = [
      'shopped',
      'shipped-to-gyb',
      'received-by-gyb',
      'shipped-to-shopper',
      'received',
    ];
    const itemsShoppedData = await Item.aggregate([
      {
        $match: {
          $or: [{ batchId: null }, { isTemplateBatchItem: false }],
        },
      },
      {
        $group: {
          _id: 'shopped',
          total: { $sum: { $cond: [{ $in: ['$status', statuses] }, 1, 0] } },
          today: {
            $sum: {
              $cond: [
                { $gte: ['$statusUpdateDates.shoppedDate', today] },
                1,
                0,
              ],
            },
          },
          thisWeek: {
            $sum: {
              $cond: [
                { $gte: ['$statusUpdateDates.shoppedDate', sevenDays] },
                1,
                0,
              ],
            },
          },
          thisMonth: {
            $sum: {
              $cond: [
                { $gte: ['$statusUpdateDates.shoppedDate', month] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    statistics['itemsChart'] = [];
    statistics['itemsChart'].push(summedDonationData, itemsShoppedData[0]);

    return statistics;
  } catch (error) {
    console.error(`Error in get all statistics: ${error}`);
    return { success: false, message: `Error in get all statistics: ${error}` };
  }
};

module.exports = {
  getAllStatistics,
  getReportData,
};

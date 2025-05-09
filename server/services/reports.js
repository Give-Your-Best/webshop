const ExcelJS = require('exceljs');
const { getHistoricReportData } = require('./statistics');
const Report = require('../models/Report');
const { createObjectCsvStringifier } = require('csv-writer');
const User_ = require('../models/User');
const moment = require('moment');

async function createWorkbook(data) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Give Your Best UK';
  workbook.name = 'Give Your Best Webshop Report (Historic Data)';

  // add sheets
  const sheet = workbook.addWorksheet('General');
  const sheetTwo = workbook.addWorksheet('Category');
  const sheetThree = workbook.addWorksheet('Size');
  const sheetFour = workbook.addWorksheet('Tag');

  // general worksheet
  sheet.columns = [
    { key: 'name', width: 50 },
    { key: 'value', width: 20 },
  ];

  // sheet one headings and styles
  sheet.getCell('A1').value = {
    richText: [
      {
        font: { bold: true, name: 'Calibri', scheme: 'minor' },
        text: 'Give Your Best Webshop Report (Historic Data)',
      },
    ],
  };

  sheet.getCell('A3').value = {
    richText: [{ font: { bold: true }, text: '' }],
  };

  //define columns and heading styles for each group by sheet
  const sheets = [sheetTwo, sheetThree, sheetFour];

  sheets.forEach((s) => {
    s.columns = [
      { header: s.name, key: s.name.toLowerCase(), width: 30 },
      { header: 'Number of items uploaded', key: 'uploaded', width: 27 },
      { header: 'Number of items shopped', key: 'shopped', width: 27 },
      { header: 'Number of unique shoppers', key: 'unique', width: 27 },
      {
        header:
          !data.dateRange || !data.dateRange.length
            ? 'Number of items available'
            : '',
        key: 'available',
        width: 27,
      },
    ];

    s.getCell('A1').font = {
      name: 'Calibri',
      bold: true,
    };
    s.getCell('B1').font = {
      name: 'Calibri',
      bold: true,
    };
    s.getCell('C1').font = {
      name: 'Calibri',
      bold: true,
    };
    s.getCell('D1').font = {
      name: 'Calibri',
      bold: true,
    };
    s.getCell('E1').font = {
      name: 'Calibri',
      bold: true,
    };
  });

  // sheet one rows

  sheet.addRow({
    name: 'Number of Shoppers signed-up',
    value: data.shopperCount || 0,
  });
  sheet.addRow({
    name: 'Number of Shoppers signed-up plus additional shoppers',
    value: data.shopperCountWithAdditional || 0,
  });
  sheet.addRow({
    name: 'Number of distinct Shoppers who have shopped',
    value: data.shoppersWhoShopped || 0,
  });

  sheet.addRow({ name: '', value: '' });

  sheet.addRow({
    name: 'Number of Donors',
    value: data.donorCount || 0,
  });
  sheet.addRow({
    name: 'Number of distinct Donors who donated',
    value: data.donorsWhoDonated || 0,
  });

  sheet.addRow({ name: '', value: '' });

  sheet.addRow({
    name: 'Number of Items uploaded',
    value: data.itemsCount || 0,
  });
  sheet.addRow({
    name: 'Number of Items shopped',
    value: data.itemsShopped || 0,
  });

  // category worksheet rows

  data.category.forEach((c) => {
    sheetTwo.addRow({
      category: c._id,
      uploaded: c.total || 0,
      shopped: c.shopped || 0,
      unique:
        c.shopperUnique.filter((obj) => obj.shopperFirstName !== '').length ||
        0,
      available: c.available || 0,
    });
  });

  sheetTwo.addRow({
    category: '',
    uploaded: '',
    shopped: '',
    available: '',
    unqiue: '',
  });
  sheetTwo.addRow({
    category: '',
    uploaded: '',
    shopped: '',
    available: '',
    unique: '',
  });

  data.subCategory.forEach((c) => {
    sheetTwo.addRow({
      category: c._id,
      uploaded: c.total || 0,
      shopped: c.shopped || 0,
      unique:
        c.shopperUnique.filter((obj) => obj.shopperFirstName !== '').length ||
        0,
      available: c.available || 0,
    });
  });

  // size worksheet rows

  data.clothingSize.forEach((c) => {
    sheetThree.addRow({
      size: c._id,
      uploaded: c.total || 0,
      shopped: c.shopped || 0,
      unique:
        c.shopperUnique.filter((obj) => obj.shopperFirstName !== '').length ||
        0,
      available: c.available || 0,
    });
  });

  sheetThree.addRow({ size: '', uploaded: '', shopped: '', available: '' });
  sheetThree.addRow({ size: '', uploaded: '', shopped: '', available: '' });

  data.shoeSize.forEach((c) => {
    sheetThree.addRow({
      size: c._id,
      uploaded: c.total || 0,
      shopped: c.shopped || 0,
      unique:
        c.shopperUnique.filter((obj) => obj.shopperFirstName !== '').length ||
        0,
      available: c.available || 0,
    });
  });

  // tags worksheet rows

  data.tags.forEach((c) => {
    //deleted tags sometimes return item data
    sheetFour.addRow({
      tag: c._id,
      uploaded: c.total || 0,
      shopped: c.shopped || 0,
      unique:
        c.shopperUnique.filter((obj) => obj.shopperFirstName !== '').length ||
        0,
      available: c.available || 0,
    });
  });

  return workbook;
}

async function saveReportToDatabase(reportData, name, type) {
  const fileName = name.endsWith('.xlsx') ? name : `${name}.xlsx`;

  const report = {
    name: fileName,
    data: reportData,
    size: reportData.length,
    type: type,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the report with the given name and update it with the new data,
  // or create a new report if one doesn't exist
  // ensures only one report is stored in the database (updated with the latest data)
  const updatedReport = await Report.findOneAndUpdate(
    { name: fileName },
    report,
    options
  );

  return updatedReport;
}
async function generateReport() {
  try {
    const data = await getHistoricReportData();
    const workbook = await createWorkbook(data);

    // Write the workbook to an Excel file on disk - used for local testing
    // await workbook.xlsx.writeFile('report.xlsx');

    const reportBuffer = await workbook.xlsx.writeBuffer();
    await saveReportToDatabase(reportBuffer, workbook.name, 'historic'); // Pass 'historic' as the type of report

    return {
      success: true,
      message: 'Report generated and saved to the database',
    };
  } catch (error) {
    console.error(`Error in generating report: ${error}`);
  }
}

async function getLatestReportByType(type) {
  // Fetch the latest report of the specified type from the database
  const report = await Report.findOne({ type: type }).sort({
    createdAt: -1,
  });
  return report;
}

async function generateLatestShoppersReport() {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' },
      { id: 'email', title: 'Email Address' },
      { id: 'fullAddress', title: 'Full Address' },
      { id: 'postCode', title: 'Post Code' },
    ],
  });

  try {
    const shoppers = await User_.User.find({ kind: 'shopper' }).lean();

    const records = shoppers.map((shopper) => ({
      firstName: shopper.firstName,
      lastName: shopper.lastName,
      email: shopper.email,
      fullAddress: [
        shopper.deliveryAddress.firstLine,
        shopper.deliveryAddress.secondLine,
        shopper.deliveryAddress.city,
      ]
        .filter(Boolean)
        .join(', '),
      postCode: shopper.deliveryAddress.postcode,
    }));

    const csvData =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(records);

    return csvData;
  } catch (error) {
    console.error(`Error in creating latest shoppers CSV data: ${error}`);
    return null;
  }
}

/*
 * Name & Email address of shoppers who signed up in the last week
 * and have a London / Greater London postcode
 */
async function generateWeeklyLondonShoppersReport() {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' },
      { id: 'email', title: 'Email Address' },
      { id: 'postcode', title: 'Post Code' },
    ],
  });

  try {
    const oneWeekAgo = moment().subtract(7, 'days').startOf('day').toDate();
    const today = moment().endOf('day').toDate();

    // Updated regex pattern
    const shoppers = await User_.User.find({
      kind: 'shopper',
      createdAt: { $gte: oneWeekAgo, $lte: today },
      'deliveryAddress.postcode': {
        $regex:
          /^(E|EC|N|NW|SE|SW|W|WC|BR|CR|DA|EN|HA|IG|KT|RM|SM|TN|TW|UB|WD)\d/i,
      },
    }).lean();

    const records = shoppers.map((shopper) => ({
      firstName: shopper.firstName,
      lastName: shopper.lastName,
      email: shopper.email,
      postcode: shopper.deliveryAddress.postcode,
    }));

    const csvData =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(records);

    return csvData;
  } catch (error) {
    console.error(`Error in weekly London shoppers CSV: ${error}`);
    return null;
  }
}

module.exports = {
  generateReport,
  getLatestReportByType,
  generateLatestShoppersReport,
  generateWeeklyLondonShoppersReport,
};

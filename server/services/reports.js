const ExcelJS = require('exceljs');
const { getHistoricReportData } = require('./statistics');
const Report = require('../models/report');

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
    name: 'Number of Shoppers',
    value: data.shopperCount || 0,
  });
  sheet.addRow({
    name: 'Number of Shoppers plus additional shoppers',
    value: data.shopperCountWithAdditional || 0,
  });
  sheet.addRow({
    name: 'Number of converted Shoppers',
    value: data.shopperConvertedCount || 0,
  });
  sheet.addRow({
    name: 'Number of converted Shoppers plus additional shoppers',
    value: data.shopperConvertedCountWithAdditional || 0,
  });

  sheet.addRow({ name: '', value: '' });

  sheet.addRow({
    name: 'Number of Donors',
    value: data.donorCount || 0,
  });
  sheet.addRow({
    name: 'Number of converted Donors',
    value: data.donorConvertedCount || 0,
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

module.exports = {
  generateReport,
  getLatestReportByType,
};

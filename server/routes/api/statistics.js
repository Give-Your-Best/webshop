const express = require('express');
const router = express.Router();
const {
  getAllStatistics,
  getReportData,
} = require('../../services/statistics');
const { generateReport } = require('../../services/reports');
const Report = require('../../models/report');

// get settings endpoint api/statistics
router.get('/', async (req, res) => {
  const statistics = await getAllStatistics();
  res.json(statistics);
});

// get settings endpoint api/statistics
router.get('/report', async (req, res) => {
  let from = req.query.from || '';
  let to = req.query.to || '';
  const data = await getReportData(from, to);
  res.json(data);
});

// generate historic report
router.get('/historic', async (req, res) => {
  const response = await generateReport();
  res.json(response);
});

router.get('/download/:reportName', async (req, res) => {
  try {
    // Fetch the report from the database
    const report = await Report.findOne({ name: req.params.reportName });

    // Set the response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${report.reportName}.xlsx`
    );

    // Send the report data as a response
    res.send(report.data);
  } catch (error) {
    console.error(`Error in downloading report: ${error}`);
    res.status(500).send('An error occurred while downloading the report');
  }
});

module.exports = router;

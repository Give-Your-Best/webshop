const express = require('express');
const router = express.Router();
const {
  getAllStatistics,
  getReportData,
} = require('../../services/statistics');
const { generateReport } = require('../../services/reports');
const { downloadReport } = require('../../controllers/statistics');

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

// used for test purposes to manually generate the report whilst testing
// this endpoint should not be used in production as generating the historic report crashes the app.
// we have a dedicated scheduled task which calls the generateReport function on a periodic basis
router.get('/generate-historic-report', async (req, res) => {
  const response = await generateReport();
  res.json(response);
});

// endpoint used for the client to download the latest report from the server
// currently we only have one report that is held at a time, and it's of type 'historic'. In the future, there might be others held
router.get('/download-latest-report/:type', async (req, res) => {
  await downloadReport(req, res);
});

module.exports = router;

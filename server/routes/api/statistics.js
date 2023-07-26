const express = require('express');
const router = express.Router();
const {
  getAllStatistics,
  getReportData,
} = require('../../services/statistics');

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

module.exports = router;

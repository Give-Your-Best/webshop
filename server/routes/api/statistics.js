const express = require('express');
const router = express.Router();
const { getAllStatistics } = require('../../services/statistics');

// get settings endpoint api/statistics
router.get('/', async (req, res) => {
    console.log('route')
    const statistics = await getAllStatistics();
    res.json(statistics);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Locations = require('../../controllers/locations');
const {
  getLocation,
  getAllLocations,
  deleteLocation,
} = require('../../services/locations');

// get users endpoint api/locations
router.get('/', async (req, res) => {
  let status = req.query.status || '';
  const locations = await getAllLocations(status);
  res.json(locations);
});

// get item endoint api/settings/:name
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const location = await getLocation(id);
  res.json(location);
});

// update item endpoint put to api/settings/:name
router.put('/:id', Locations.updateLocation);

// delete item endoint delete to api/items/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const item = await deleteLocation(id);
  res.json(item);
});

// create location endpoint post to api/locations
router.post('/', Locations.createLocation);

module.exports = router;

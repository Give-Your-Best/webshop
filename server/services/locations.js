const Location = require('../models/Location');

const updateLocation = async (id, updateData) => {
    console.log('update locationa service');
    try {
        const location = await Location.findOneAndUpdate({'_id': id}, updateData, { useFindAndModify: false, returnDocument: 'after'});
        if (location) {
            return { success: true, message: 'setting updated', location: location }
        } else {
          throw Error('Cannot update setting');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};

const getAllLocations = async (status) => {
  const values = (status === 'available')? {"available": true}: {};
  console.log('get all locs')
  try {
    const locations = await Location.find(values);
    return locations;
  } catch (error) {
    console.error(`Error in getAlllocations: ${error}`);
    return { success: false, message: `Error in getAlllocations: ${error}` }
  }
};

const createLocation = async (data) => {
  console.log('create location service');
  console.log(data);
  try {
      const location = new Location(data)
      let saveLocation = await location.save();
      return { success: true, message: `Location created`, location: location }
  } catch (err) {
      console.error(err);
      return { success: false, message: err }
  }
};

const getLocation = async (id) => {
    console.log('get location')
    try {
        const location = await Location.find({'_id': id});
        if (location) {
            return location
        } else {
          throw Error('Cannot find location');
        }
      } catch (error) {
        console.error(`Error in getLocation: ${error}`);
        return { success: false, message: `Error in getLocation: ${error}` }
      }
};

const deleteLocation = async (id) => {
  console.log('delete location service');
  try {
      const location = await Location.findByIdAndRemove(id, { useFindAndModify: false });
      if (location) {
          return { success: true, message: 'location deleted' }
      } else {
        throw Error('Cannot delete location');
      }
  } catch (error) {
      console.error(`Error in deletelocation: ${error}`);
      return { success: false, message: `Error in deletelocation: ${error}` }
  }
};

module.exports = { 
  getLocation,
  updateLocation,
  getAllLocations,
  deleteLocation,
  createLocation
};
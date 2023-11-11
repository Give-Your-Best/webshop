require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User');
const Item = require('../models/Item');
const Location = require('../models/Location');
const Settings = require('../models/Settings');

const users = require('./users.json');
const items = require('./items.json');
const locations = require('./locations.json');
const settings = require('./settings.json');

(async () => {
  try {
    // Establish the database connection
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');

    // Populate the default app settings
    await Settings.insertMany(settings);
    console.log('Settings ✔');

    // Add a user of each type
    await Promise.all(
      users.map(async (user) => {
        const instance = new User[user.type](user);
        await instance.save();
      })
    );
    console.log('Users ✔');

    // Populate dummy locations
    await Location.insertMany(locations);
    console.log('Locations ✔');

    // Add some dummy items to the shop
    await Item.insertMany(items);
    console.log('Items ✔');

    await mongoose.connection.close();
  } catch (e) {
    console.warn('Something went wrong: ', e);
    await mongoose.connection.close();
  }
})();

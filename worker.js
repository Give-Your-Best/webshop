require('dotenv').config();
const mongoose = require('mongoose');

const Bugsnag = require('./server/utils/bugsnag');

const { getDonorNotificationItems } = require('./server/services/items');

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');

    await getDonorNotificationItems();
  } catch (err) {
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
  }
})();

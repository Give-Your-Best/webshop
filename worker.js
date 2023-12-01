require('dotenv').config();
const mongoose = require('mongoose');

const Bugsnag = require('./server/utils/bugsnag');

const workers = require('./server/workers');

const [, , job] = process.argv;

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');

    // Access the worker
    await workers[job]();
    // validate some stuff?
  } catch (err) {
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
  }
})();

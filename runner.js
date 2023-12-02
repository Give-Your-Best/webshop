require('dotenv').config();
const mongoose = require('mongoose');

const Bugsnag = require('./server/utils/bugsnag');

const tasks = require('./server/tasks');

(async function run() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');

    const [, , taskName, ...args] = process.argv;

    if (typeof tasks[taskName] !== 'function') {
      throw new Error('Invalid task name: ' + taskName);
    }

    // Invoke the task
    await tasks[taskName](...args);
    // validate some stuff?
  } catch (err) {
    console.warn(err);
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
})();

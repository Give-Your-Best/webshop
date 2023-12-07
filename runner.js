require('dotenv').config();
const mongoose = require('mongoose');

const Bugsnag = require('./server/utils/bugsnag');

const handlers = require('./server/tasks');

/**
 * Simple task runner triggered by the heroku scheduler to handle infrequent,
 * short-running jobs (dispatch reminder emails etc.). Scheduler is configured
 * to invoke the runner at a regular interval with the name of a task and any
 * optional arguments, e.g. `node runner my_task_name arg_1 arg_2`.
 *
 * See: https://devcenter.heroku.com/articles/scheduler#defining-tasks
 */

(async function run() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');

    // Parse the command
    const [, , taskName, ...rest] = process.argv;

    if (typeof handlers[taskName] !== 'function') {
      throw new Error('Invalid task name: ' + taskName);
    }

    // Invoke the task
    await handlers[taskName](...rest);
  } catch (err) {
    console.warn(err);
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
})();

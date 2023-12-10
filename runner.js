require('dotenv').config();
const winston = require('winston');
const mongoose = require('mongoose');

const env = require('./server/config/environment');
const handlers = require('./server/tasks');
const Bugsnag = require('./server/utils/bugsnag');
const MongoTransport = require('./server/utils/transport');

const { combine, timestamp, json } = winston.format;

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

    // Configure the logger instance
    const logger = winston.createLogger({
      level: 'info',
      defaultMeta: {
        service: 'task-runner',
        event: taskName,
      },
      format: combine(timestamp(), json()),
      transports:
        // There is no need to use the custom transport (log entries to MongoDB)
        // putside of production - for all other environments we can log to the
        // console...
        env === 'production'
          ? [new MongoTransport()]
          : [new winston.transports.Console()],
    });

    // Pass it over to bugsnag in the catch block
    logger.on('error', (error) => {
      throw error;
    });

    // Invoke the handler - logger is always the first argument
    await handlers[taskName](logger, ...rest);
  } catch (err) {
    console.warn(err);
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
})();

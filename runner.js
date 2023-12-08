require('dotenv').config();
require('winston-mongodb');
const winston = require('winston');
const mongoose = require('mongoose');

const env = require('./server/config/environment');
const handlers = require('./server/tasks');
const Bugsnag = require('./server/utils/bugsnag');

const { combine, timestamp, json } = winston.format;

const metadata = winston.format((logEntry) => {
  const metaEntries = Object.entries(logEntry).filter(([key]) => {
    return (
      key !== 'level' &&
      key !== 'message' &&
      key !== 'timestamp' &&
      typeof key !== 'symbol'
    );
  });

  logEntry.metadata = Object.fromEntries(metaEntries);
  return logEntry;
});

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

    // Configuration for the MongoDB logs transport
    const options = {
      db: mongoose.connection,
      collection: 'logs',
    };

    // Configure the logger instance
    const logger = winston.createLogger({
      level: 'info',
      defaultMeta: {
        service: 'task-runner',
        event: taskName,
      },
      format: combine(timestamp(), json(), metadata()),
      transports:
        env === 'production'
          ? [new winston.transports.MongoDB(options)]
          : [new winston.transports.Console()],
    });

    // Because we are writing the logs to MongoDB via the dedicated transport,
    // we need to ennsure that the process cannot exit (and the connection be
    // closed) until the log stream is terminated...
    await new Promise((resolve) => {
      logger.on('error', resolve);
      logger.on('finish', resolve);

      // Invoke the task (logger is always the first argument)...
      // Once the handler is finished, terminate the logger
      handlers[taskName](logger, ...rest).then(() => logger.end());
    });
  } catch (err) {
    console.warn(err);
    Bugsnag.notify(err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
})();

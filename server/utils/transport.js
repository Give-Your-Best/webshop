const Transport = require('winston-transport');

const LogEntry = require('../models/LogEntry');

class CustomTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, cb = () => {}) {
    const { event, level, message, metadata, service, timestamp } = info;

    (async () => {
      try {
        const entry = new LogEntry({
          event,
          level,
          message,
          metadata,
          service,
          timestamp,
        });

        await entry.save();

        this.emit('logged', entry);
        cb(null, true);
      } catch (error) {
        this.emit('error', error);
        cb(error);
      }
    })();
  }
}

module.exports = CustomTransport;

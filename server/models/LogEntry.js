const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logEntrySchema = new Schema({
  event: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    enum: ['error', 'info', 'warn'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  metadata: Schema.Types.Mixed,
  service: {
    type: String,
    enum: ['task-runner', 'web-application'],
    required: true,
  },
  timestamp: {
    type: Date,
    immutable: true,
    required: true,
  },
});

// Set a time to live on documents of 30 days.
logEntrySchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

const LogEntry = mongoose.model('Log', logEntrySchema);

module.exports = LogEntry;

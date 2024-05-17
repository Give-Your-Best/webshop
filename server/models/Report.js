const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    name: String,
    data: Buffer,
    size: Number, // in bytes
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;

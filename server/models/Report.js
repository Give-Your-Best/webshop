const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    name: String,
    data: Buffer,
    size: Number, // in bytes
    type: String, // to begin with, we will only store "historic" reports, but perhaps in the future there will be
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;

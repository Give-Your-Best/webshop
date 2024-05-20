require('dotenv').config();
const reportService = require('../services/reports');

const downloadReport = async (req, res) => {
  try {
    const type = req.params.type;
    const report = await reportService.getLatestReportByType(type);

    if (!report) {
      return res.status(404).send({ message: 'No report found' });
    }

    // Set the response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${report.name}.xlsx`
    );
    res.setHeader('Report-Name', report.name);

    // Send the report data as a response
    console.log('returning data');
    res.status(200).send(report.data);
  } catch (error) {
    req.bugsnag.notify(error);
    console.error(`Service error: ${error}`);
    return res.status(500).send({ message: `Service error: ${error}` });
  }
};

module.exports = {
  downloadReport,
};

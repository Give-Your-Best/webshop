const generateReport = require('../services/report/generateReport');

module.exports = async (logger) => {
  try {
    await generateReport();
    logger.info(`Generated and saved report.`);
  } catch (error) {
    logger.error(`Error generating historic report: ${error}`);
  }
};

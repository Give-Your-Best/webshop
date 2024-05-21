const moment = require('moment');
const {
  generateReport,
  getLatestReportByType,
} = require('../services/reports');
const { sendBulkMail, sendMail } = require('../services/mail');
const { getAllSettings } = require('../services/settings');

module.exports = async (logger) => {
  // Get the day of the month
  const date = moment().date();

  // This job is triggered on a daily schedule but we only want it to run once
  // a month at the start of the month...
  if (date !== 1) {
    return;
  }

  try {
    const response = await generateReport();

    // Get the email recipients from settings collection
    const settings = await getAllSettings();
    const recipients = settings
      .filter(({ name }) => name === 'reportRecipient')
      .map(({ value }) => value);

    if (response.success) {
      // generated report successfully
      logger.info(response.message);

      // Fetch the latest report
      const report = await getLatestReportByType('historic');

      if (report) {
        const subject = 'New GYB Historic Report Available';
        const emailHTML =
          '<p>A new report with historic data (to-date) is available.</p>';
        // Send the report
        const mailResponse = await sendBulkMail(
          subject,
          emailHTML,
          recipients,
          report
        );

        if (mailResponse.success) {
          logger.info(mailResponse.message);
        } else {
          logger.error(`Failed to send email: ${mailResponse.err}`);
        }
      } else {
        logger.error('No report found');
      }
    } else {
      // Report generation failed
      logger.error(response.message);
      const subject = 'Issue with Generating Historic Report';
      const emailHTML =
        '<p>There was an issue with generating the historic report.</p>';

      // Send the error email
      const mailResponse = await sendMail(
        subject,
        emailHTML,
        'gyb.developers@gmail.com'
      );
      if (mailResponse.success) {
        logger.info(mailResponse.message);
      } else {
        logger.error(`Failed to send email: ${mailResponse.err}`);
      }
    }
  } catch (error) {
    logger.error(`Error generating historic report: ${error}`);
  }
};

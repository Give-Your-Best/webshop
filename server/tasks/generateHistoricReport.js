const {
  generateReport,
  getLatestReportByType,
} = require('../services/reports');
const { sendMail } = require('../services/mail');

module.exports = async (logger) => {
  try {
    const response = await generateReport();

    const recipient = 'r.sahakyan1@gmail.com'; // need to replace with the emails of the actual recipients - waiting for confirmation
    const recipientName = 'GYB'; // waiting for confirmation

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
        const mailResponse = await sendMail(
          subject,
          emailHTML,
          recipient,
          recipientName,
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
        recipient,
        recipientName
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

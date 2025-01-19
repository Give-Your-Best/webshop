const moment = require('moment');
const {
  generateReport,
  getLatestReportByType,
  generateLatestShoppersReport,
} = require('../services/reports');
const { sendBulkMail, sendMail } = require('../services/mail');
const { getAllSettings } = require('../services/settings');

async function sendHistoricReport(logger) {
  try {
    const response = await generateReport();

    if (response.success) {
      logger.info(response.message);

      const report = await getLatestReportByType('historic');
      if (report) {
        const settings = await getAllSettings();
        const recipients = settings
          .filter(({ name }) => name === 'reportRecipient')
          .map(({ value }) => value);

        const subject = 'New GYB Historic Report Available';
        const emailHTML =
          '<p>A new report with historic data (to-date) is available.</p>';
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
      logger.error(response.message);
      const subject = 'Issue with Generating Historic Report';
      const emailHTML =
        '<p>There was an issue with generating the historic report.</p>';
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
}

async function sendLatestShoppersCsv(logger) {
  try {
    const csvData = await generateLatestShoppersReport();
    if (csvData) {
      const settings = await getAllSettings();
      const recipients = settings
        .filter(({ name }) => name === 'shoppersReport')
        .map(({ value }) => value);

      const subject = 'GYB Latest Shoppers Data Available';
      const emailHTML =
        '<p>This email is automatically generated on the first day of each month. Attached is a csv file with the latest shoppers data available.</p>';
      const mailResponse = await sendBulkMail(subject, emailHTML, recipients, {
        name: 'latest_shoppers.csv',
        data: csvData,
        size: csvData.length,
      });

      if (mailResponse) {
        logger.info(mailResponse.message);
      } else {
        logger.error(
          `Failed to send email: ${
            mailResponse ? mailResponse.err : 'Unknown error'
          }`
        );
      }
    } else {
      logger.error('Failed to generate latest shoppers CSV data');
      const subject = 'Issue with Generating Shoppers Report';
      const emailHTML =
        '<p>There was an issue with generating the latest shoppers report.</p>';
      const mailResponse = await sendBulkMail(
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
    logger.error(`Error generating shoppers report: ${error}`);
    const subject = 'Error Generating Shoppers Report';
    const emailHTML =
      '<p>There was an error generating the latest shoppers report.</p>';
    const mailResponse = await sendBulkMail(
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
}

async function reportsOrchestrator(logger) {
  // Get the day of the month
  const date = moment().date();

  // This job is triggered on a daily schedule but we only want it to run once
  // a month at the start of the month...
  if (date !== 1) {
    logger.info('Not the first day of the month. Skipping tasks.');
    return;
  }

  logger.info('First day of the month. Running tasks.');
  await sendHistoricReport(logger);
  await sendLatestShoppersCsv(logger);
}

module.exports = {
  sendHistoricReport,
  sendLatestShoppersCsv,
  reportsOrchestrator,
};

const moment = require('moment');
const { getMarchIwdPromoItems } = require('../services/items');

module.exports = async (logger) => {
  // Get the day of the month
  const now = moment();
  const month = now.month();
  const year = now.year();

  console.log(month, year);

  // Promo is running in 2025
  if (year !== 2025) {
    return;
  }

  // Promo is running in month of March (2) only
  if (month !== 2) {
    return;
  }

  await getMarchIwdPromoItems();

  // console.log('This is an example task runner module');
  // logger.info('This is an example task runner module');

  // As a gesture of thanks for your donation, our partners at sustainable clothing brand Eleven Loves, are giving our Give Your Best contributors 20% off all full price lines.  Visit www.elevenloves.co.uk to shop.  Enter the code BESTIE20 at checkout to apply your discount.
};

const moment = require('moment');
const { sendMail } = require('../services/mail');
const { updatePromoDonors } = require('../services/users');
const { getMarchIwdPromoItemDonors } = require('../services/items');

const emailTemplate = (content) => `
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"> 
    <style>
      p {
        color: #BA191A;
        font-size: 20px;
        font-family: Lato;
        text-align: center;
      }
      a {
        font-size: 20px;
        color: #BA191A;
        font-family: Lato;
      }
    </style>
  </head>
  <body style="width:100%;margin:0;background-color:#FFFBFC;">
    <div style="height:125px;background-color:#FAD6DF;padding:10px 0 50px 0;display:block;width:100%;">
          <img style=" width:100px;height:100px;margin:auto;display:block;" alt='logo' src='https://res.cloudinary.com/hnlrfgzzh/image/upload/v1655378744/GYB_Logos_copy-07_z1ke0l_td1xmj.png' />
    </div>
    <div style="display:flex">
      <div style="width:15%;margin:0;display:block"></div>
      <div style="width:70%;display:block;margin:-40px 0 0 0;background-color:white;border:2px solid #A21010;border-radius: 30px;padding: 30px;color:#BA191A;font-size:20px;font-family:Lato;text-align:center;">
        ${content}
        <div style="margin-top:30px;">
          <p>Thanks!</p>
          <p>Give Your Best Team! x</p>
        </div>
      </div>
      <div style="width:15%;margin:0;display:block"></div>
    </div>
  </body>
</html>
`;

const renderEmailProperties = (user) => {
  const subject = 'Thanks for your donation!';

  const name = `${user.firstName} ${user.lastName}`.trim();

  const content = `
<div style="margin-top:30px;">
  <p>Dear ${name},</p>
  <p>As a gesture of thanks for your donation, our partners at sustainable clothing brand Eleven Loves are giving our Give Your Best contributors 20% off all full price lines.</p>
  <p>Visit <a href="www.elevenloves.co.uk">www.elevenloves.co.uk</a> to shop.</p>
  <p>Enter the code <strong>BESTIE20</strong> at checkout to apply your discount.</p>
</div>
  `;

  return { name, subject, content };
};

module.exports = async (logger) => {
  const now = moment();
  const month = now.month();
  const year = now.year();

  // Promo is running in 2025
  if (year !== 2025) {
    return;
  }

  // Promo is running in month of March (2) only
  if (month !== 2) {
    return;
  }

  // Get the relevant donors
  const data = await getMarchIwdPromoItemDonors();

  const ids = Object.keys(data);
  const recipients = Object.values(data);

  if (recipients.length < 1) {
    return;
  }

  // Build and dispatch emails
  const reminders = await Promise.all(
    recipients
      .map((u) => {
        const { name, subject, content } = renderEmailProperties(u);

        return [subject, emailTemplate(content), u.email, name];
      })
      .map((r) => sendMail(...r))
  );

  // Update the donors for exclusion from next result
  const result = await updatePromoDonors(ids);

  logger.info(
    `Sent ${reminders.length} March 2025 IWD promo emails with ${
      reminders.filter((r) => !r.success).length
    } failures.`,
    {
      metadata: {
        recipients,
        updated: { ids, ...result },
      },
    }
  );
};

const { sendMail } = require('../services/mail');
const { getUsers } = require('../services/users');
const { getStatusReminderItems } = require('../services/items');

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
        border: 2px solid #A21010;
        padding: 0.3rem 1.2rem;
        font-size: 20px;
        color: #BA191A;
        font-family: Lato;
        background-color: #FAD22A;
        margin: 30px auto;
        width: 150px;
        text-align: center;
        text-decoration: none;
        display: block;
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

const renderEmailProperties = (user, items, interval) => {
  const period = {
    7: 'One week',
    14: 'Two weeks',
  }[interval];

  const plural = items.length > 1;

  const subject = {
    donor: `${period} since your ${
      plural ? 'items were' : 'item was'
    } shopped!`,
    shopper: `${period} since your ${plural ? 'items were' : 'item was'} sent!`,
  }[user.kind];

  const name = `${user.firstName} ${user.lastName}`.trim();

  const content = {
    donor: `
<div style="margin-top:30px;">
  <p>Dear ${name},</p>
  <p>It is ${period.toLowerCase()} since your ${
    plural ? 'items were' : 'item was'
  } shopped:</p>
  ${
    plural
      ? `<ul style="display:inline-block;text-align:left;">${items
          .map((i) => `<li><strong>${i.name}</strong></li>`)
          .join('\n')}</ul>`
      : `<strong>${items[0].name}</strong>`
  }
  <p>Please remember to mark as sent once ${
    plural ? "they're" : "it's"
  } in the post!</p>
</div>
  `,
    shopper: `
<div style="margin-top:30px;">
  <p>Dear ${name},</p>
  <p>It is ${period.toLowerCase()} since your ${
    plural ? 'items were' : 'item was'
  } shipped:</p>
  ${
    plural
      ? `<ul style="display:inline-block;text-align:left;">${items
          .map((i) => `<li><strong>${i.name}</strong></li>`)
          .join('\n')}</ul>`
      : `<strong>${items[0].name}</strong>`
  }
  <p>Please remember to mark as received once ${
    plural ? "they've" : "it's"
  } arrived!</p>
</div>
  `,
  }[user.kind];

  return { name, subject, content };
};

/**
 * Dispatch reminder emails for status updates on items either shopped (donor
 * user reminders) or shipped (shopper user reminders).
 */
module.exports = async (logger) => {
  const settings = [
    // 1 week since item shopped, please confirm sent
    {
      interval: 7,
      currentStatus: 'shopped',
      updateType: 'shoppedDate',
      userType: 'donor',
    },
    // 2 weeks since item shopped, please confirm sent
    {
      interval: 14,
      currentStatus: 'shopped',
      updateType: 'shoppedDate',
      userType: 'donor',
    },
    // 1 week since item shipped, please confirm received
    {
      interval: 7,
      currentStatus: 'shipped-to-shopper',
      updateType: 'shopperShippedDate',
      userType: 'shopper',
    },
    // 2 weeks since item shipped, please confirm received
    {
      interval: 14,
      currentStatus: 'shipped-to-shopper',
      updateType: 'shopperShippedDate',
      userType: 'shopper',
    },
  ];

  for (const s of settings) {
    const items = await getStatusReminderItems(s);

    // If there was an issue with the query, continue to the next
    if (items.success === false) continue;

    const users = await getUsers(Object.keys(items));

    // If there was an issue with the query, continue to the next
    if (users.success === false) continue;

    // If there are no users to notify, continue to the next
    if (users.length < 1) continue;

    const reminders = users.map((u) => {
      const { name, subject, content } = renderEmailProperties(
        u,
        items[u.id],
        s.interval
      );

      return [subject, emailTemplate(content), u.email, name];
    });

    const result = await Promise.all(reminders.map((r) => sendMail(...r)));

    logger.info(
      `Sent ${result.length} reminder emails with ${
        result.filter((r) => !r.success).length
      } failures.`,
      {
        metadata: {
          ...s,
          recipients: Object.keys(items),
        },
      }
    );
  }
};

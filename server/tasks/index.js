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

// TODO
const renderEmailProperties = (user, items, delta) => {
  const period = {
    7: '1 week',
    14: '2 weeks',
  }[delta];

  const pluralise = items.length > 1;

  const subject = {
    donor: `${period} since your ${
      pluralise ? 'items were' : 'item was'
    } shopped!`,
    shopper: `${period} since your ${
      pluralise ? 'items were' : 'item was'
    } sent!`,
  }[user.kind];

  const name = `${user.firstName} ${user.lastName}`.trim();

  const content = {
    donor: `
<div style="margin-top:30px;">
    <p>Dear ${name},</p>
    <p>It is ${period} since your ${
      pluralise ? 'items were' : 'item was'
    } shopped:</p>
    ${
      pluralise
        ? `<ul>${items.map((i) => `<li><strong>${i.name}</strong></li>`)}</ul>`
        : `<strong>${items[0].name}</strong>`
    }
    <p>Please remember to mark as sent once ${
      pluralise ? "they're" : "it's"
    } in the post!</p>
</div>
  `,
    shopper: `
<div style="margin-top:30px;">
    <p>Dear ${name},</p>
    <p>It is ${period} since your ${
      pluralise ? 'items were' : 'item was'
    } shipped:</p>
    ${
      pluralise
        ? `<ul>${items.map((i) => `<li><strong>${i.name}</strong></li>`)}</ul>`
        : `<strong>${items[0].name}</strong>`
    }
    <p>Please remember to mark as received once ${
      pluralise ? "they've" : "it's"
    } arrived!</p>
</div>
  `,
  }[user.kind];

  return { name, subject, content };
};

/**
 *
 */
const send_order_status_reminders = async () => {
  // TODO can the config go in the DB settings ??
  const config = [
    // 1 week since item shopped, please confirm sent
    {
      delta: 7,
      status: 'shopped',
      kind: 'donor',
    },
    // 2 weeks since item shopped, please confirm sent
    {
      delta: 14,
      status: 'shopped',
      kind: 'donor',
    },
    // 1 week since item shipped, please confirm received
    {
      delta: 7,
      status: 'shipped-to-shopper',
      kind: 'shopper',
    },
    // 2 weeks since item shipped, please confirm received
    {
      delta: 14,
      status: 'shipped-to-shopper',
      kind: 'shopper',
    },
  ];

  for (const unit of config) {
    const items = await getStatusReminderItems(unit);

    if (items.success === false) continue; // TODO how to handle errors?

    const users = await getUsers(Object.keys(items));

    console.log(items, users);

    const reminders = users.map((u) => {
      const { name, subject, content } = renderEmailProperties(
        u,
        items[u.id],
        unit.delta
      );

      // TODO return [subject, content, email, name];
      return [subject, emailTemplate(content), 'email@example.com', name];
    });

    const results = await Promise.all(reminders.map((r) => sendMail(...r)));

    // Will want to log something here or maybe write a log to db...

    console.log(results);
  }
};

module.exports = {
  send_order_status_reminders,
};

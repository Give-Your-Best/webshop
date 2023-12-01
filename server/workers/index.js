const { getStatusReminderItems } = require('../services/items');
const { getUsers } = require('../services/users');
const { sendMail } = require('../services/mail');

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
const reminderContent = () => {};

/**
 *
 */
const order_reminders = async () => {
  //
  const config = [
    [7, 'donor'], // 1 week
    [14, 'donor'], // 2 week
    [7, 'shopper'], // 1 week
    [14, 'shopper'], // 2 week
  ];

  for (const [d, u] of config) {
    const items = await getStatusReminderItems(d, u);
    const users = await getUsers(Object.keys(items));

    // Process stuff, format data and do the mail out
    // Do some meta things - log some stuff, update some stuff??
    console.log(items, users);

    const reminders = users.map((u) => {
      // const { email, firstName, lastName, kind, id } = u;
      const { firstName, lastName, kind, id } = u;

      const name = `${firstName} ${lastName}`.trim();
      const subject = '';
      const content = reminderContent(kind)(items[id]);

      // return [subject, content, email, name];
      return [subject, emailTemplate(content), 'email@example.com', name];
    });

    const results = await Promise.all(reminders.map((r) => sendMail(...r)));

    console.log(results);
  }
};

module.exports = {
  order_reminders,
};

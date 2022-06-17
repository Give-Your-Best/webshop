const { mailjet } = require('../utils/mailjet');

const sendMail = async (subject, emailHTML, recipient, recipientName) => {
  console.log('send mail service');
  console.log(subject);
  console.log(emailHTML);

  const request = await mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "hello@giveyourbest.uk",
          "Name": "Give Your Best"
        },
        "To": [
          {
            "Email": (recipient && recipient !== "")? recipient: "hello@giveyourbest.uk",
            "Name": recipientName
          }
        ],
        "Subject": subject || 'New Message on Give Your Best Webshop',
        "HTMLPart": emailHTML,
        "CustomID": subject || 'New Message on Give Your Best Webshop',
      }
    ]
  })
  if (request.response.statusCode === 200) {
    return { success: true, message: `Email sent!` }
  } else {
      return { success: false, message: 'Failed to send email', err: request.response.statusCode}
  }
};

module.exports = { sendMail };
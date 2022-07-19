const { mailjet } = require('../utils/mailjet');
const { getSetting } = require('../services/settings');

const sendMail = async (subject, emailHTML, recipient, recipientName) => {
  const gybEmail = await getSetting('shop_email');

  const request = await mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": gybEmail,
          "Name": "Give Your Best"
        },
        "To": [
          {
            "Email": (recipient && recipient !== "")? recipient: gybEmail,
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

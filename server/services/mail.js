const { mailjet } = require('../utils/mailjet');
const { getSetting } = require('../services/settings');

const sendMail = async (
  subject,
  emailHTML,
  recipient,
  recipientName,
  attachment = {}
) => {
  const gybEmail = await getSetting('shop_email');

  const message = {
    From: {
      Email: 'r.sahakyan1@gmail.com',
      Name: 'Give Your Best',
    },
    To: [
      {
        Email: recipient && recipient !== '' ? recipient : gybEmail,
        Name: recipientName,
      },
    ],
    Subject: subject || 'New Message on Give Your Best Webshop',
    HTMLPart: emailHTML,
    CustomID: subject || 'New Message on Give Your Best Webshop',
  };

  // If the attachment size is less than 10 MB, attach it (e.g. the historic report is ~11Kb, so not a real concern)
  // Note: 15mb is the size limit for the email, so we are keeping the attachment size less than 10mb
  // to give buffer space for the email content
  // please adjust if needed
  // NOTE NOTE: attachment type is excel. If other types are needed, we can expand this function
  if (attachment && attachment.size < 10 * 1024 * 1024) {
    message.Attachments = [
      {
        ContentType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        Filename: attachment.name,
        Base64Content: attachment.data.toString('base64'),
      },
    ];
  }

  const request = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [message],
  });

  if (request.response.status === 200) {
    return { success: true, message: `Email sent!` };
  } else {
    return {
      success: false,
      message: 'Failed to send email',
      err: request.response.status,
    };
  }
};

module.exports = { sendMail };

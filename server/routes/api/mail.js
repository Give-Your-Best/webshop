const express = require('express');
const router = express.Router();
const { sendMail } = require('../../services/mail');

// update item endpoint put to api/mail/
router.post('/', async (req, res) => {

    //email parameters
    const subject = req.body.subject;
    const emailHTML = req.body.emailHTML;
    const recipient = req.body.recipient;
    const recipientName = req.body.recipientName;

    const mail = await sendMail(subject, emailHTML, recipient, recipientName);
    res.json(mail);
});

module.exports = router;
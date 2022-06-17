import { sendMail } from '../services/mail';
import { autoEmails } from '../utils/constants';

export const openHiddenTab = (type) => {
    if (document.querySelector('.add' + type)) {
        document.querySelector('.add' + type).click();
    }
} 

export const reopenTab = (type) => {
    if (document.querySelector('.' + type + 'list')) {
        document.querySelector('.' + type + 'list').click();
    }
} 

export const checkPermission = (permissions, permission) => {
    return permissions.map(p => p.toLowerCase()).includes(permission.toLowerCase());
}

export const trunc = (str) => {
    return (str.length > 61)? str.substring(0, 61) + '...': str;
}

const emailFooter = `
    <div style="margin-top:30px;">
    <p>Thanks!</p>
    <p>Give Your Best Team! x</p>
    </div>
`;

const emailItems = (items) => {
    var grid = items.map((i)=>{
        return (
        `<div style="background-color: #FAD6DF;margin: 1em;padding: 1em;border-radius: 30px;display: flex;height: 175px;" key=`+i._id+`>
        <img style="border-radius: 10px;height: 175px;width: auto;" src=`+i.photos[0].url+` alt='item' />
        <div><p style="margin-left: 10px;margin-bottom: 0;display: block;">`+i.name+`</p>
        <p style="margin-left: 10px;margin-bottom: 0;display: block;">`+i.description+`</p></div>
        </div>`
        );
    }).join('');

    return (`<section><p style="margin:30px;">Order Summary</p>`+grid+`</section>`)
};

const deliveryAddressContent = (deliveryAddress) => {
    return (`<section>
            <p style="margin:30px;">Delivery Address</p>`
            + ((deliveryAddress.firstLine)? `<p style="margin: 0;">` + deliveryAddress.firstLine + `</p>`: ``)
            + ((deliveryAddress.secondLine)? `<p style="margin: 0;">` + deliveryAddress.secondLine + `</p>`: ``)
            + ((deliveryAddress.city)? `<p style="margin: 0;">` + deliveryAddress.city + `</p>`: ``)
            + ((deliveryAddress.country)? `<p style="margin: 0;">` + deliveryAddress.country + `</p>`: ``)
            + ((deliveryAddress.postcode)? `<p style="margin: 0;">` + deliveryAddress.postcode + `</p>`: ``)
         + `</section>`)
}

export const emailTemplate = (content) => {
    return (`
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
                        border: 2px solid #BA1B1A;
                        padding: 0.3rem 1.2rem;
                        font-size: 20px;
                        color: #BA191A;
                        font-family: Lato;
                        background-color: #51C1EF;
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
                <div style="width:20%;margin:0;display:block"></div>
                <div style="width:60%;display:block;margin:-40px auto 0 auto;background-color:white;border:2px solid #BA191A;border-radius: 30px;padding: 30px;color:#BA191A;font-size:20px;font-family:Lato;text-align:center;">
                ` + content + `
                ` + emailFooter + `
                </div>
                <div style="width:20%;margin:0;display:block"></div>
            </body>
        </html>
    `)
}

export const sendAutoEmail = async (type, userDetails, items, deliveryAddress) => {

    console.log('user');
    console.log(userDetails)
    console.log(items)
    console.log(deliveryAddress)

    const subject = autoEmails.filter((e) => {return e.type === type})[0].subject;
    var emailContent = autoEmails.filter((e) => {return e.type === type})[0].content;
    const recipientName = (userDetails)? userDetails.firstName + ' ' + userDetails.lastName: 'Admin';

    if (type === 'order_placed' || type === 'item_shopped_with_address') {
        console.log('?')
        emailContent += emailItems(items);
        emailContent += deliveryAddressContent(deliveryAddress);
    } else if (type === 'item_shopped_pending_address') {
        emailContent += emailItems(items);
    }

    const emailHTML = emailTemplate(emailContent);

    const res = await sendMail({
        subject: subject, 
        emailHTML: emailHTML.replace('{{name}}', recipientName),
        recipient: (userDetails)? userDetails.email: null,
        recipientName: recipientName
      });
  
      if (res.success) {
          console.log('success')
      } else {
        console.log('error', res.message);
      }
      return
}
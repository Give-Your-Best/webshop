import env from '../config/environment';
import { sendMail } from '../services/mail';
import { autoEmails } from '../utils/constants';
import {
  adminTabs,
  donorTabs,
  shopperTabs,
} from '../components/organisms/Dashboard/Tabs/constants';
import heic2any from 'heic2any';

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const downloadWorkbook = async (workbook) => {
  const uint8Array = await workbook.xlsx.writeBuffer();
  const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = workbook.name + `.xlsx`;
  a.click();
  a.remove();
};

export const formatDate = (date) => {
  let newDate = new Date(date);

  return (
    newDate.getDate() +
    '-' +
    (newDate.getMonth() + 1) +
    '-' +
    newDate.getFullYear()
  );
};

export const hideMobileMenu = () => {
  document.getElementById('mobileMenu').style.display = 'none';
  document.getElementById('cross').style.display = 'none';
  document.querySelectorAll('#mobileMenu li.open').forEach((i) => {
    i.classList.remove('open');
  });
  return;
};

export const showMobileMenu = () => {
  document.getElementById('mobileMenu').style.display = 'block';
  document.getElementById('cross').style.display = 'block';
  return;
};

export const getDate = () => {
  const d = new Date();
  return d.toISOString();
};

export const name = (userDetails) => {
  if (!userDetails) {
    return '';
  }

  if (userDetails.firstName && userDetails.lastName) {
    return userDetails.firstName + ' ' + userDetails.lastName;
  } else if (userDetails.firstName && !userDetails.lastName) {
    return userDetails.firstName;
  } else if (!userDetails.firstName && userDetails.lastName) {
    return userDetails.lastName;
  } else {
    return userDetails.email;
  }
};

export const sort = (i) => {
  return i.sort(function (a, b) {
    var nameA = a.text.toUpperCase(); // ignore upper and lowercase
    var nameB = b.text.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1; //nameA comes first
    }
    if (nameA > nameB) {
      return 1; // nameB comes first
    }
    return 0; // names must be equal
  });
};

export const getItemDetails = (item) => {
  let detailsHtml = '',
    shippedDate = '',
    donatedDate = '',
    shoppedBy = '',
    shoppedDate = '',
    donatedBy = '',
    locationName = '',
    assignedDate;

  //get donor and donation date
  if (item.donorId && item.donorId.firstName) {
    donatedBy = name(item.donorId);
    donatedDate = new Date(item.createdAt).toLocaleString();
    detailsHtml +=
      '<span><strong>Donated By:</strong> ' +
      donatedBy +
      '<br /></span><span><strong>Donated On:</strong> ' +
      donatedDate +
      '<br /></span>';
  }

  //get shopper and shopped date
  if (item.shopperId && item.shopperId.firstName) {
    shoppedBy = name(item.shopperId);
    shoppedDate = new Date(item.statusUpdateDates.shoppedDate).toLocaleString();
    detailsHtml +=
      '<span><strong>Shopped By:</strong> ' +
      shoppedBy +
      '<br /></span><span><strong>Shopped On:</strong> ' +
      shoppedDate +
      '<br /></span>';
  }

  //get shopper delivery address details
  if (item.shopperId && item.shopperId.deliveryAddress) {
    const { deliveryAddress } = item.shopperId;

    detailsHtml += `<span><strong>Shopper Address:</strong>
    <div>${(() => {
      const { FAO, name, firstLine, secondLine, city, country, postcode } =
        deliveryAddress;

      const result =
        (FAO ? `<span>FAO ${FAO}</span><br />` : '') +
        (name ? `<span>${name}</span><br />` : '') +
        (firstLine ? `<span>${firstLine}</span><br />` : '') +
        (secondLine ? `<span>${secondLine}</span><br />` : '') +
        (city ? `<span>${city}</span><br />` : '') +
        (country ? `<span>${country}</span><br />` : '') +
        (postcode ? `<span>${postcode}</span><br />` : '');

      return result;
    })()}</div>`;
  }

  if (item.sendVia && item.sendVia.name) {
    locationName = item.sendVia.name;
    detailsHtml +=
      '<span><strong>Assigned To:</strong> ' + locationName + '<br /></span>';
  }

  if (item.statusUpdateDates && item.statusUpdateDates.gybAssignedDate) {
    assignedDate = new Date(
      item.statusUpdateDates.gybAssignedDate
    ).toLocaleString();
    detailsHtml +=
      '<span><strong>Assigned At:</strong> ' + assignedDate + '<br /></span>';
  }

  //get item shipped date
  if (
    item.statusUpdateDates &&
    item.statusUpdateDates.gybShippedDate &&
    !item.statusUpdateDates.shopperShippedDate
  ) {
    shippedDate = new Date(
      item.statusUpdateDates.gybShippedDate
    ).toLocaleString();
    detailsHtml +=
      '<span><strong>Shipped On:</strong> ' + shippedDate + '<br /></span>';
  } else if (
    item.statusUpdateDates &&
    item.statusUpdateDates.gybShippedDate &&
    item.statusUpdateDates.shopperShippedDate
  ) {
    shippedDate = new Date(
      item.statusUpdateDates.shopperShippedDate
    ).toLocaleString();
    detailsHtml +=
      '<span><strong>Shipped On:</strong> ' + shippedDate + '<br /></span>';
  } else if (
    item.statusUpdateDates &&
    item.statusUpdateDates.shopperShippedDate
  ) {
    shippedDate = new Date(
      item.statusUpdateDates.shopperShippedDate
    ).toLocaleString();
    detailsHtml +=
      '<span><strong>Shipped On:</strong> ' + shippedDate + '<br /></span>';
  }

  return detailsHtml;
};

export const getItemShopperAndDonorDetails = (item) => {
  let detailsHtml = '',
    shoppedBy = '',
    donatedBy = '',
    locationName = '';

  //get donor and donation date
  if (item.donorId && item.donorId.firstName) {
    donatedBy = name(item.donorId);
    detailsHtml +=
      '<span><strong>Donated By:</strong> ' + donatedBy + '<br /></span>';
  }

  //get shopper and shopped date
  if (item.shopperId && item.shopperId.firstName) {
    shoppedBy = name(item.shopperId);
    detailsHtml +=
      '<span><strong>Shopped By:</strong> ' + shoppedBy + '<br /></span>';
  }

  if (item.sendVia && item.sendVia.name) {
    locationName = item.sendVia.name;
    detailsHtml +=
      '<span><strong>Assigned To:</strong> ' + locationName + '<br /></span>';
  }

  return detailsHtml;
};

export const tabList = (user) => {
  var tabs = [];

  if (!user) {
    return tabs;
  }

  switch (user.type) {
    default:
      tabs = [];
      break;
    case 'admin':
      tabs = adminTabs;
      break;
    case 'donor':
      tabs = donorTabs;
      break;
    case 'shopper':
      tabs = shopperTabs;
      break;
  }
  return tabs;
};

export const openHiddenTab = (type) => {
  if (document.querySelector('.add' + type)) {
    document.querySelector('.add' + type).click();
  }
};

export const reopenTab = (type) => {
  if (document.querySelector('.' + type + 'list')) {
    document.querySelector('.' + type + 'list').click();
  }
};

export const lessThanSixHoursAgo = (date) => {
  const HOUR = 6 * 1000 * 60 * 60;
  const sixHoursAgo = Date.now() - HOUR;

  return date > sixHoursAgo;
};

export const checkPermission = (permissions, permission) => {
  return permissions
    .map((p) => p.toLowerCase())
    .includes(permission.toLowerCase());
};

export const trunc = (str = '') => {
  return str.length > 61 ? str.substring(0, 61) + '...' : str;
};

const blobToData = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const convertHeic = async (fileList) => {
  console.log('con');
  console.log(fileList.length);
  //if a file in the filelist is of type heic then use heic2any to convert to a png
  const newList = await Promise.all(
    fileList.map(async (f) => {
      console.log('test');
      if (f.name && f.name.includes('.heic') && f.originFileObj) {
        //will skip if no file object
        //this is a heic file type
        //convert to jpg
        const c = await heic2any({
          blob: f.originFileObj,
          toType: 'image/png',
          quality: 0.5,
        });

        const resData = await blobToData(c);
        f.imageUrl = resData; //update with dataurl to pass to cloudinary in the backend
        f.name = f.name.split('.heic')[0] + '.png'; //update ext
        return f;
      } else if (f.name && f.originFileObj) {
        console.log('else');
        const resData = await blobToData(f.originFileObj);
        f.imageUrl = resData; //update with dataurl to pass to cloudinary in the backend
        return f;
      } else return f; //return object as is (this will be an existing image)
    })
  );
  return newList;
};

export const checkUnread = (type, userId, messages = []) => {
  let unread = [];
  if (!messages.length) {
    return [0, []];
  }
  messages.filter((m) => {
    if (
      type === 'admin' &&
      m.recipient != null &&
      m.recipient.kind === 'admin' &&
      m.viewed === false
    ) {
      unread.push(m._id);
    } else if (
      m.recipient != null &&
      m.recipient._id === userId &&
      m.viewed === false
    ) {
      unread.push(m._id);
    }
    return '';
  });

  return [unread.length, unread];
};

export const setImageSrc = (data) =>
  data && data.url
    ? data.url.replace('http://', 'https://')
    : '/product-placeholder.jpeg';

export const getFrontImageUrl = (images) => {
  let imagesList = images.length ? images.filter((i) => i.front === true) : [];
  let image_url = imagesList.length
    ? setImageSrc(imagesList[0])
    : images.length
    ? setImageSrc(images[0])
    : '';

  return image_url;
};

const emailFooter = `
    <div style="margin-top:30px;">
    <p>Thanks!</p>
    <p>Give Your Best Team! x</p>
    </div>
`;

export const donorItemsOrdering = (items) => {
  /* [
        {
            'shopper': 'testing shopper name',
            'shopperId': '1234567',
            'shopperAddress': ??,
            'items': [
                {}, {}, {}
            ]
        },
        {
            'shopper': 'testing shopper 2',
            'shopperId': '1234567',
            'shopperAddress': ??,
            'items': [
                {}
            ]
        },
    ]

    */
  let itemsToSend = [],
    itemsAwaitingReceived = [];

  items.forEach((i) => {
    if (i.status === 'shopped') {
      let foundIndex = itemsToSend.findIndex(
        (u) => u.shopperId === i.shopperId._id
      );

      if (foundIndex !== -1) {
        itemsToSend[foundIndex].items.push(i);
      } else {
        itemsToSend.push({
          shopper: name(i.shopperId),
          shopperId: i.shopperId._id,
          items: [i],
        });
      }
    } else {
      let foundIndex = itemsAwaitingReceived.findIndex(
        (u) => u.packageId === i.packageId
      );

      if (foundIndex !== -1) {
        itemsAwaitingReceived[foundIndex].items.push(i);
      } else {
        if (i.shopperId) {
          itemsAwaitingReceived.push({
            shopper: name(i.shopperId),
            shopperId: i.shopperId._id,
            items: [i],
            packageId: i.packageId,
          });
        }
      }
    }
  });
  return [itemsToSend, itemsAwaitingReceived];
};

const emailItems = (items) => {
  var grid = items
    .map((i) => {
      return (
        `<div style="background-color: #FAD6DF;margin: 1em;padding: 1em;border-radius: 30px;display: flex;height: 175px;" key=` +
        i._id +
        `>
        <img style="border-radius: 10px;height: 175px;width: auto;" src=` +
        i.photos[0].url +
        ` alt='item' />
        <div><p style="margin-left: 10px;margin-bottom: 0;display: block;">` +
        i.name +
        `</p>
        <p style="margin-left: 10px;margin-bottom: 0;display: block;">` +
        i.description +
        `</p></div>
        </div>`
      );
    })
    .join('');

  return (
    `<section><p style="margin:30px;">Order Summary</p>` + grid + `</section>`
  );
};

const deliveryAddressContent = (deliveryAddress) => {
  return (
    `<section>
            <p style="margin:30px;">Delivery Address</p>` +
    (deliveryAddress.FAO
      ? `<p style="margin: 0;">FAO ` + deliveryAddress.FAO + `</p>`
      : ``) +
    (deliveryAddress.name
      ? `<p style="margin: 0;">` + deliveryAddress.name + `</p>`
      : ``) +
    (deliveryAddress.firstLine
      ? `<p style="margin: 0;">` + deliveryAddress.firstLine + `</p>`
      : ``) +
    (deliveryAddress.secondLine
      ? `<p style="margin: 0;">` + deliveryAddress.secondLine + `</p>`
      : ``) +
    (deliveryAddress.city
      ? `<p style="margin: 0;">` + deliveryAddress.city + `</p>`
      : ``) +
    (deliveryAddress.country
      ? `<p style="margin: 0;">` + deliveryAddress.country + `</p>`
      : ``) +
    (deliveryAddress.postcode
      ? `<p style="margin: 0;">` + deliveryAddress.postcode + `</p>`
      : ``) +
    `</section>`
  );
};

export const emailTemplate = (content) => {
  return (
    `
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
                ` +
    content +
    `
                ` +
    emailFooter +
    `
                </div>
                <div style="width:15%;margin:0;display:block"></div>
                </div>
            </body>
        </html>
    `
  );
};

export const sendAutoEmail = async (
  type,
  userDetails,
  items,
  deliveryAddress
) => {
  if (env !== 'production') {
    return;
  }

  const subject = autoEmails.filter((e) => {
    return e.type === type;
  })[0].subject;
  var emailContent = autoEmails.filter((e) => {
    return e.type === type;
  })[0].content;
  const recipientName = userDetails
    ? userDetails.firstName + ' ' + userDetails.lastName
    : 'Admin';
  const password =
    userDetails && userDetails.password ? userDetails.password : '';

  if (type === 'order_placed') {
    emailContent += emailItems(items);
    emailContent += deliveryAddressContent(deliveryAddress);
  } else if (type === 'item_shopped_with_address') {
    emailContent += emailItems(items);
    emailContent += deliveryAddressContent(deliveryAddress);
  } else if (
    type === 'item_shopped_pending_address' ||
    type === 'item_received' ||
    type === 'order_cancelled_donor' ||
    type === 'order_cancelled_shopper'
  ) {
    emailContent += emailItems(items);
  } else if (type === 'item_assigned') {
    emailContent += emailItems(items);
    emailContent += deliveryAddressContent(deliveryAddress);
  }

  const emailHTML = emailTemplate(emailContent);

  const res = await sendMail({
    subject: subject,
    emailHTML: emailHTML
      .replace('{{name}}', recipientName)
      .replace('{{password}}', password),
    recipient: userDetails ? userDetails.email : null,
    recipientName: recipientName,
  });

  if (res.success) {
    console.log('success');
  } else {
    console.log('error', res.message);
  }
  return;
};

export const getAutoEmailContent = (type) => {
  var emailContent = autoEmails.filter((e) => {
    return e.type === type;
  })[0].content;
  return emailTemplate(emailContent);
};

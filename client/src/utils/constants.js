const homeLink = 'https://shop.giveyourbest.uk';

/* 
These are the updated sizes, we are stashing them for a bit,
whilst we revert back to old sizing and then address the sizing update properly
*/

// export const clothingSizeOptions = [
//   '4',
//   '6',
//   '8',
//   '10',
//   '12',
//   '14',
//   '16',
//   '18',
//   '20',
//   '22',
//   '24',
//   '26',
//   '28',
//   '30',
//   'XXS',
//   'XS',
//   'S',
//   'M',
//   'L',
//   'XL',
//   'XXL',
//   '3XL',
//   '4XL',
//   'One Size',
// ];

// export const childrenClothingSizeOptions = [
//   '0-4 Months',
//   '3-6 Months',
//   '6-9 Months',
//   '9-12 Months',
//   '12-18 Months',
//   '18-24 Months',
//   '2-3 Years',
//   '3-4 Years',
//   '4-5 Years',
//   '5-6 Years',
//   '6-7 Years',
//   '7-8 Years',
//   '10 Years',
//   '12 Years',
//   '14 Years',
//   '16 Years',
//   'One Size',
// ];

// export const shoeSizeOptions = [
//   'UK 1',
//   'UK 2',
//   'UK 2.5',
//   'UK 3',
//   'UK 3.5',
//   'UK 4',
//   'UK 4.5',
//   'UK 5',
//   'UK 5.5',
//   'UK 6',
//   'UK 6.5',
//   'UK 7',
//   'UK 7.5',
//   'UK 8',
//   'UK 9',
//   'UK 10',
//   'UK 11',
//   'UK 11.5',
//   'UK 12',
//   'UK 12.5',
//   'UK 13',
//   'UK 13.5',
//   'UK 14',
// ];

// export const childrensShoeSizeOptions = [
//   'Kids 0',
//   'Kids 1',
//   'Kids 1.5',
//   'Kids 2',
//   'Kids 2.5',
//   'Kids 3',
//   'Kids 3.5',
//   'Kids 4',
//   'Kids 4.5',
//   'Kids 5',
//   'Kids 5.5',
//   'Kids 6',
//   'Kids 6.5',
//   'Kids 7',
//   'Kids 7.5',
//   'Kids 8',
//   'Kids 8.5',
//   'Kids 9',
//   'Kids 9.5',
//   'Kids 10',
//   'Kids 10.5',
//   'Kids 11',
//   'Kids 11.5',
//   'Kids 12',
//   'Kids 12.5',
//   'Kids 13',
//   'Kids 13.5',
//   'UK 1',
//   'UK 1.5',
//   'UK 2',
//   'UK 2.5',
//   'UK 3',
//   'UK 3.5',
//   'UK 4',
//   'UK 4.5',
//   'UK 5',
// ];

export const clothingSizeOptions = [
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '3XL',
  '4XL',
  'Child',
  'Baby',
];

export const shoeSizeOptions = [
  '1',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '9',
  '10',
];

export const oneSizeOptions = ['One Size'];

export const colours = [
  'Black',
  'Blue',
  'White',
  'Brown',
  'Green',
  'Grey',
  'Multi',
  'Navy',
  'Neutral',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'Silver',
  'Gold',
  'Yellow',
];

export const currentStatus = [
  'Seeking Asylum',
  'Refugee',
  'Destitute',
  'No recourse to public funds',
  'Prefer not to say',
  'Case Worker',
  'Other',
];

/* 
These are the updated categories & subcategories, we are stashing them for a bit,
whilst we revert back to old sizing & options, and then address the sizing update properly
*/

// export const categories = [
//   {
//     name: 'Women',
//     id: 'women',
//   },
//   {
//     name: 'Children & Baby',
//     id: 'children',
//   },
//   {
//     name: 'Accessories',
//     id: 'accessories',
//   },
//   {
//     name: 'Shoes',
//     id: 'shoes',
//   },
//   {
//     name: 'Other',
//     id: 'other',
//   },
// ];

// export const subCategories = [
//   {
//     name: 'Coats, Jackets & Outerwear',
//     id: 'coats',
//     image: 'GYB-coats-and-jackets.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Dresses & Jumpsuits',
//     id: 'dresses',
//     image: 'GYB-dresses.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Jumpers & Cardigans',
//     id: 'sweaters',
//     image: 'GYB-sweaters-and-cardigans.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Shirts & Blouses',
//     id: 'shirts',
//     image: 'GYB-shirts-and-blouses.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Skirts & Shorts',
//     id: 'skirts',
//     image: 'GYB-skirts.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Sleepwear & Loungewear',
//     id: 'sleepwear',
//     image: 'GYB-sleepwear-and-loungewear.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Sportswear',
//     id: 'sportswear',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Swimwear',
//     id: 'swimwear',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Tops & T-Shirts',
//     id: 'tops',
//     image: 'GYB-tops-and-tshirts.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Trousers & Leggings',
//     id: 'trousers',
//     image: 'GYB-trousers.svg',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Underwear',
//     id: 'underwear',
//     parentCategory: 'women',
//   },
//   {
//     name: 'Maternity',
//     id: 'maternity',
//     parentCategory: 'women',
//     image: 'GYB-maternity.svg',
//   },
//   {
//     name: 'Baby Bundles',
//     id: 'baby',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Bodysuits',
//     id: 'bodysuits',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Coats, Jackets & Outerwear',
//     id: 'children-coats',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Dresses & Jumpsuits',
//     id: 'children-dresses',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Dungarees & All-in-ones',
//     id: 'children-dungarees',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Jumpers & Cardigans',
//     id: 'children-jumpers',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Pyjamas & Sleepwear',
//     id: 'children-sleepwear',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Shoes & Slippers',
//     id: 'children-shoes',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Skirts & Shorts',
//     id: 'children-skirts',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Swimwear',
//     id: 'children-swimwear',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Tops & T-shirts',
//     id: 'children-tops',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Trousers & Leggings',
//     id: 'children-bottoms',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Toys & Books',
//     id: 'toys',
//     parentCategory: 'children',
//   },
//   {
//     name: 'Bags',
//     id: 'bags',
//     parentCategory: 'accessories',
//   },
//   {
//     name: 'Hats, Scarves & Gloves',
//     id: 'winter',
//     parentCategory: 'accessories',
//   },
//   {
//     name: 'Jewellery',
//     id: 'jewellery',
//     parentCategory: 'accessories',
//   },
//   {
//     name: 'Other',
//     id: 'other',
//     parentCategory: 'accessories',
//   },
//   {
//     name: 'Boots',
//     id: 'boots',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Flats',
//     id: 'flats',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Heels',
//     id: 'heels',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Sandals',
//     id: 'sandals',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Slippers',
//     id: 'slippers',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Trainers / Sneakers',
//     id: 'trainers',
//     parentCategory: 'shoes',
//   },
//   {
//     name: 'Other',
//     id: 'other',
//     parentCategory: 'other',
//   },
// ];

export const categories = [
  {
    name: 'Women',
    id: 'women',
  },
  {
    name: 'Children & Baby',
    id: 'children',
  },
  {
    name: 'Accessories',
    id: 'accessories',
  },
  {
    name: 'Shoes',
    id: 'shoes',
  },
  {
    name: 'Other',
    id: 'other',
  },
];

export const subCategories = [
  {
    name: 'Dresses',
    id: 'dresses',
    image: 'GYB-dresses.svg',
    parentCategory: 'women',
  },
  {
    name: 'Sweaters & Cardigans',
    id: 'sweaters',
    image: 'GYB-sweaters-and-cardigans.svg',
    parentCategory: 'women',
  },
  {
    name: 'Trousers & Jeans',
    id: 'trousers',
    image: 'GYB-trousers.svg',
    parentCategory: 'women',
  },
  {
    name: 'Skirts & Shorts',
    id: 'skirts',
    image: 'GYB-skirts.svg',
    parentCategory: 'women',
  },
  {
    name: 'Coats & Jackets',
    id: 'coats',
    image: 'GYB-coats-and-jackets.svg',
    parentCategory: 'women',
  },
  {
    name: 'Tops & T-shirts',
    id: 'tops',
    image: 'GYB-tops-and-tshirts.svg',
    parentCategory: 'women',
  },
  {
    name: 'Shirts & Blouses',
    id: 'shirts',
    image: 'GYB-shirts-and-blouses.svg',
    parentCategory: 'women',
  },
  {
    name: 'Sleepwear & Loungewear',
    id: 'sleepwear',
    image: 'GYB-sleepwear-and-loungewear.svg',
    parentCategory: 'women',
  },
  {
    name: 'Underwear',
    id: 'underwear',
    parentCategory: 'women',
  },
  {
    name: 'Maternity',
    id: 'maternity',
    parentCategory: 'women',
    image: 'GYB-maternity.svg',
  },
  {
    name: 'Aged 4 - 5',
    id: '4/5',
    parentCategory: 'children',
  },
  {
    name: 'Aged 6 - 9',
    id: '46/9',
    parentCategory: 'children',
  },
  {
    name: 'Aged 10 - 12',
    id: '10/12',
    parentCategory: 'children',
  },
  {
    name: 'Aged 13 - 16',
    id: '13/16',
    parentCategory: 'children',
  },
  {
    name: 'Baby Bundles',
    id: 'baby',
    parentCategory: 'children',
  },
  {
    name: '12 - 36 month Bundles',
    id: '12/35-month',
    parentCategory: 'children',
  },
  {
    name: 'Toys & Books',
    id: 'toys',
    parentCategory: 'children',
  },
  {
    name: 'Bags',
    id: 'bags',
    parentCategory: 'accessories',
  },
  {
    name: 'Hats, Scarves & Gloves',
    id: 'winter',
    parentCategory: 'accessories',
  },
  {
    name: 'Jewellery',
    id: 'jewellery',
    parentCategory: 'accessories',
  },
  {
    name: 'Swimwear',
    id: 'swimwear',
    parentCategory: 'accessories',
  },
  {
    name: 'Other',
    id: 'other',
    parentCategory: 'accessories',
  },
  {
    name: 'Trainers / Sneakers',
    id: 'trainers',
    parentCategory: 'shoes',
  },
  {
    name: 'Sandals',
    id: 'sandals',
    parentCategory: 'shoes',
  },
  {
    name: 'Boots',
    id: 'boots',
    parentCategory: 'shoes',
  },
  {
    name: 'Heels',
    id: 'heels',
    parentCategory: 'shoes',
  },
  {
    name: 'Flats',
    id: 'flats',
    parentCategory: 'shoes',
  },
  {
    name: 'Other',
    id: 'other',
    parentCategory: 'other',
  },
];

export const permissions = [
  'Message',
  'View notifications',
  'Assign locations',
  'Approve shoppers',
  'Approve donors',
  'Approve items',
  'Upload products',
  'Adjust shop settings',
  'Edit users',
  'Add team members',
];

export const tagColours = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export const autoEmails = [
  {
    type: 'new_user',
    content:
      "<p>Hi {{name}}!<p><p>Great news! You have a new account with Give Your Best.</p>Your temporary password is: </p><p>{{password}}</p></p>Follow this link to log in and update your password.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'sign_up',
    content:
      '<p>Hi {{name}}!<p><p>Thanks for signing up, your application has been sent to our admin team and we’ll get back to you as soon as possible.</p>',
  },
  {
    type: 'sign_up_donor',
    content:
      "<p>Hi {{name}}!<p><p>Thanks for signing up! You can start uploading items and we'll add them to the shop as soon as possible!</p>",
  },
  {
    type: 'account_approved',
    content:
      "<p>Hi {{name}}!<p><p>Great news! Your account has been approved. Follow this link to log in and view your dashboard.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'account_declined',
    content:
      "<p>Hi {{name}}!<p><p>We’re sorry, but your account has been declined at this time. If you think this is a mistake, contact us here to let us know why!</p><a href='" +
      homeLink +
      "/dashboard'>Contact Us</a>",
  },
  {
    type: 'order_placed',
    content:
      "<p>Hi {{name}}!<p><p>Thank you for your order! Please see a summary below.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'order_cancelled_donor',
    content:
      "<p>Hi {{name}}!<p><p>Your order was cancelled! Your item will be back in the shop soon.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'order_cancelled_shopper',
    content:
      "<p>Hi {{name}}!<p><p>Your order has been cancelled! We hope you will be back to shop soon!</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'message_sent',
    content:
      "<p>Hi {{name}}!<p><p>Thank you for your message. An admin will reply to you as soon as possible.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_message',
    content:
      "<p>Hi {{name}}!<p><p>You have 1 new message waiting on the Give Your Best Webshop.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_shopped_with_address',
    content:
      "<p>Hi {{name}}!<p><p>You have 1 new order waiting to be dispatched.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_shopped_pending_address',
    content:
      "<p>Hi {{name}}!<p><p>You’ve had an item shopped which will be sent via a Give Your Best admin member. We will send you another email shortly with all of the details you will need in regards to sending this on. </p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_shopped_auto_send_via_gyb',
    content:
      "<p>Hi {{name}}!<p><p>You’ve had an item shopped which will be sent via our Give Your Best office and is waiting for dispatch.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_signup',
    content:
      "<p>Hi Admin!<p><p>There’s been a new sign up! Please log in here to review the application.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_admin_message',
    content:
      "<p>Hi Admin!<p><p>You have 1 new message waiting on the Give Your Best Webshop.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_admin_notification',
    content:
      "<p>Hi Admin!<p><p>You have 1 new notification waiting on the Give Your Best Webshop.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_item_to_assign_location',
    content:
      "<p>Hi Admin!<p><p>You have a new order to assign on the Give Your Best Webshop.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'new_item_approve',
    content:
      "<p>Hi Admin!<p><p>You have new items to approve on the Give Your Best Webshop.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_on_the_way_admin',
    content:
      "<p>Hi Admin!<p><p>Great news, an order is on it’s way to you! Don’t forget to update the tracking on your admin dashboard.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_assigned',
    content:
      "<p>Hi Admin!<p><p>You have an item assigned to you!</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_on_the_way',
    content:
      "<p>Hi {{name}}!<p><p>Great news, your order is on it’s way! Don’t forget to let us know when it arrives by logging into your account and marking your order as received.</p><p>We hope you love it.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'item_received',
    content:
      "<p>Hi {{name}}!<p><p>Your item was successfully received by the recipient. Thank you again for your donation.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
  {
    type: 'password_reset',
    content:
      "<p>Hi {{name}}!<p><p>Your account password has been reset. </p>Your temporary password is: </p><p>{{password}}</p></p>Follow this link to log in and update your password.</p><a href='" +
      homeLink +
      "/dashboard'>Log In</a>",
  },
];

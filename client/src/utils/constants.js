const homeLink = 'https://give-your-best-webshop.herokuapp.com';

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
    '26'
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
    '10'
];

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
    'Yellow'
]

export const currentStatus = [
    'Seeking Asylum',
    'Refugee',
    'Destitute',
    'No recourse to public funds',
    'Prefer not to say',
    'Other'
]

export const categories = [
    {
        'name': 'Women',
        'id': 'women'
    },
    {
        'name': 'Children & Baby',
        'id': 'children'
    },
    {
        'name': 'Accessories',
        'id': 'accessories'
    },
    {
        'name': 'Shoes',
        'id': 'shoes'
    },
    {
        'name': 'Other',
        'id': 'other'
    }
]

export const subCategories = [
    {
        'name': 'Dresses',
        'id': 'dresses',
        'image': 'GYB-dresses.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Sweaters & Cardigans',
        'id': 'sweaters',
        'image': 'GYB-sweaters-and-cardigans.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Trousers & Jeans',
        'id': 'trousers',
        'image': 'GYB-trousers.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Skirts & Shorts',
        'id': 'skirts',
        'image': 'GYB-skirts.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Coats & Jackets',
        'id': 'coats',
        'image': 'GYB-coats-and-jackets.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Tops & T-shirts',
        'id': 'tops',
        'image': 'GYB-tops-and-tshirts.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Shirts & Blouses',
        'id': 'shirts',
        'image': 'GYB-shirts-and-blouses.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Sleepwear & Loungewear',
        'id': 'sleepwear',
        'image': 'GYB-sleepwear-and-loungewear.svg',
        'parentCategory': 'women'
    },
    {
        'name': 'Underwear',
        'id': 'underwear',
        'parentCategory': 'women'
    },
    {
        'name': 'Maternity',
        'id': 'maternity',
        'parentCategory': 'women',
        'image': 'GYB-maternity.svg',
    },
    {
        'name': 'Aged 4 - 5',
        'id': '4/5',
        'parentCategory': 'children'
    },
    {
        'name': 'Aged 6 - 9',
        'id': '46/9',
        'parentCategory': 'children'
    },
    {
        'name': 'Aged 10 - 12',
        'id': '10/12',
        'parentCategory': 'children'
    },
    {
        'name': 'Aged 13 - 16',
        'id': '13/16',
        'parentCategory': 'children'
    },
    {
        'name': 'Baby bundles',
        'id': 'baby',
        'parentCategory': 'children'
    },
    {
        'name': '12 - 36 month bundles',
        'id': '12/35-month',
        'parentCategory': 'children'
    },
    {
        'name': 'Bags',
        'id': 'bags',
        'parentCategory': 'accessories'
    },
    {
        'name': 'Hats, Scarves & Gloves',
        'id': 'winter',
        'parentCategory': 'accessories'
    },
    {
        'name': 'Jewellery',
        'id': 'jewellery',
        'parentCategory': 'accessories'
    },
    {
        'name': 'Other',
        'id': 'other',
        'parentCategory': 'accessories'
    },
    {
        'name': 'Trainers / Sneakers',
        'id': 'trainers',
        'parentCategory': 'shoes'
    },
    {
        'name': 'Sandals',
        'id': 'sandals',
        'parentCategory': 'shoes'
    },
    {
        'name': 'Boots',
        'id': 'boots',
        'parentCategory': 'shoes'
    },
    {
        'name': 'Heels',
        'id': 'heels',
        'parentCategory': 'shoes'
    },
    {
        'name': 'Flats',
        'id': 'flats',
        'parentCategory': 'shoes'
    },
    {
        'name': 'Other',
        'id': 'other',
        'parentCategory': 'other'
    }
]

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
    'Add team members'
]

export const autoEmails = [
    {
       'type': 'new_user',
       'content': "<p>Hi {{name}}!<p><p>Great news! You have a new account with Give Your Best.</p>Your temporary password is: </p><p>{{password}}</p></p>Follow this link to log in and update your password.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'sign_up',
        'content': "<p>Hi {{name}}!<p><p>Thanks for signing up, your application has been sent to our admin team and we’ll get back to you as soon as possible.</p>"
    },
    {
        'type': 'account_approved',
        'content': "<p>Hi {{name}}!<p><p>Great news! Your account has been approved. Follow this link to log in and view your dashboard.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'account_declined',
        'content': "<p>Hi {{name}}!<p><p>We’re sorry, but your account has been declined at this time. If you think this is a mistake, contact us here to let us know why!</p><a href='"+homeLink+"/dashboard'>Contact Us</a>"
    },
    {
        'type': 'shopper_account_declined',
        'content': "<p>Hi {{name}}!<p><p>We’re sorry, but your account has been declined at this time. If you think this is a mistake, contact us here to let us know why!</p><a href='"+homeLink+"/dashboard'>Contact Us</a>"
    },
    { // need tyo add order placed html grid
        'type': 'order_placed',
        'content': "<p>Hi {{name}}!<p><p>Thank you for your order! Please see a summary below.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'message_sent',
        'content': "<p>Hi {{name}}!<p><p>Thank you for your message. An admin will reply to you as soon as possible.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'new_message',
        'content': "<p>Hi {{name}}!<p><p>You have 1 new message waiting on the Give Your Best Webshop.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    { // need tyo add order placed html grid
        'type': 'item_shopped_with_address',
        'content': "<p>Hi {{name}}!<p><p>You have 1 new order waiting to be dispatched.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    { // need tyo add order placed html grid
        'type': 'item_shopped_pending_address',
        'content': "<p>Hi {{name}}!<p><p>You have 1 new order waiting to be dispatched. You will hear from us with a delivery address soon.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'new_signup',
        'content': "<p>Hi Admin!<p><p>There’s been a new sign up! Please log in here to review the application.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'new_admin_message',
        'content': "<p>Hi Admin!<p><p>You have 1 new message waiting on the Give Your Best Webshop.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'new_admin_notification',
        'content': "<p>Hi Admin!<p><p>You have 1 new notification waiting on the Give Your Best Webshop.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'new_item_approve',
        'content': "<p>Hi Admin!<p><p>You have new items to approve on the Give Your Best Webshop.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'item_on_the_way_admin',
        'content': "<p>Hi Admin!<p><p>Great news, an order is on it’s way to you! Don’t forget to update the tracking on your admin dashboard.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
    {
        'type': 'item_on_the_way',
        'content': "<p>Hi {{name}}!<p><p>Great news, your order is on it’s way! Don’t forget to let us know when it arrives.</p><p>We hope you love it.</p><a href='"+homeLink+"/dashboard'>Log In</a>"
    },
]

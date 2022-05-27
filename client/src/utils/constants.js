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
        'parentCategory': 'women'
    },
    {
        'name': '13 - 14',
        'id': '13/14',
        'parentCategory': 'children'
    },
    {
        'name': 'Baby bundles',
        'id': 'baby',
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
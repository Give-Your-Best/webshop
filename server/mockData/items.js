const itemOne = {
  id: '1', // unique in the db
  name: 'Blue pants with belt',
  category: 'Shorts', // from a standard set of categories
  description: `I loved this pants, used to wear them all the time. Can't fit in them anymore!`,
  size: {
    UK: '6',
    EU: '34',
  },
  photos: [
    {
      src: 'https://img01.ztat.net/article/spp-media-p1/ca86c03d733e4507a7f03c3dd1f03513/d179da10e7e949beaa680926322937a9.jpg?imwidth=1800&filter=packshot',
      front: true,
    },
    {
      src: '',
      back: true,
    },
    { src: '' },
    { src: '' },
  ],
  colors: ['blue'],
  status: 'available', // ['available', 'claimed', 'shopped']
  country: 'UK', // in the future GYB may expand in other countries
};

module.exports = {
  itemOne,
  items: [
    itemOne,
    {
      id: '2',
      name: 'summer dress',
      category: 'Dresses',
      description: '',
      size: {
        UK: '',
        EU: '36',
      },
      photos: [
        {
          front: true,
          src: 'https://img01.ztat.net/article/spp-media-p1/90f05c8a79973dbfbc901b67a775353a/bf7a9125c20c495c95f46e0a6c87cdec.jpg?imwidth=762&filter=packshot',
        },
      ],
      colors: ['red', 'white'],
      status: 'available',
      country: 'UK',
    },
    {
      id: '3',
      name: 'skirt',
      category: 'Skirts',
      description: '',
      size: {
        UK: '10',
        EU: '40',
      },
      photos: [],
      colors: ['black'],
      status: 'available',
      country: 'UK',
    },
  ],
};

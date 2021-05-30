const itemOne = {
  id: '1',
  name: 'pants',
  size: {
    UK: '6',
    EU: '34',
  },
  photos: {
    front:
      'https://img01.ztat.net/article/spp-media-p1/ca86c03d733e4507a7f03c3dd1f03513/d179da10e7e949beaa680926322937a9.jpg?imwidth=1800&filter=packshot',
    back: '',
  },
  color: ['blue'],
  status: 'open',
};

module.exports = {
  itemOne,
  items: [
    itemOne,
    {
      id: '2',
      name: 'summer dress',
      size: {
        UK: '',
        EU: '36',
      },
      photos: {
        front:
          'https://img01.ztat.net/article/spp-media-p1/90f05c8a79973dbfbc901b67a775353a/bf7a9125c20c495c95f46e0a6c87cdec.jpg?imwidth=762&filter=packshot',
        back: '',
      },
      color: ['red'],
      status: 'open',
    },
    {
      id: '3',
      name: 'skirt',
      size: {
        UK: '',
        EU: '40',
      },
      photos: {
        front: '',
        back: '',
      },
      color: ['black'],
      status: 'open',
    },
  ],
};

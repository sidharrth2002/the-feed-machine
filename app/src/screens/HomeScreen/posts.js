import { Beach, Stockholm } from '../../assets';

const posts = [
  {
    id: 'p1',
    user: 'Elon Musk',
    userPhoto: require('../../assets/musk.jpeg'),
    body: 'Tesla team just completed a 500 mile drive with a Tesla Semi weighing in at 81,000 lbs!',
    liked: true,
    topics: ['vehicles', 'news'],
    time: '1h',
  },
  {
    id: 'p2',
    user: 'CNN',
    userPhoto: require('../../assets/cnn.png'),
    body: 'American President Joe Biden announces universal Medicaid from the steps of the White house.',
    liked: false,
    topics: ['politics', 'news'],
    time: '2h',
  },
  {
    id: 'p3',
    user: 'BBC',
    userPhoto: require('../../assets/bbc.jpeg'),
    body: 'The UK has announced a new 10pm curfew for pubs and restaurants in an effort to curb the spread of COVID-19.',
    liked: false,
    topics: ['news'],
    time: '3h',
  },
  {
    id: 'p4',
    user: 'Sidharrth Nagappan',
    userPhoto: require('../../assets/sid.jpeg'),
    body: 'I just got my first job as a software engineer! I am so excited to start my career!',
    liked: false,
    topics: ['friends_and_family'],
    time: '4h',
  },
  {
    id: 'p5',
    user: 'Isak',
    userPhoto: require('../../assets/isak.png'),
    body: 'Frosty morning in Stockholm, love waking up to this view!',
    liked: false,
    topics: ['friends_and_family'],
    image: Stockholm,
    time: '5h',
  },
  {
    id: 'p6',
    user: 'Al Jazeera',
    userPhoto: require('../../assets/aljazeera.png'),
    body: 'The Taliban has taken control of Afghanistan, with the US and NATO forces withdrawing from the country.',
    liked: false,
    topics: ['news'],
    time: '6h',
  },
  {
    id: 'p7',
    user: 'BBC',
    userPhoto: require('../../assets/bbc.jpeg'),
    body: 'Alox Sharma gives speech at COP27 summit in Egypt about constructive climate policy.',
    liked: false,
    topics: ['climate', 'news'],
    time: '7h',
  },
  {
    id: 'p8',
    user: 'Sidharrth Nagappan',
    userPhoto: require('../../assets/sid.jpeg'),
    body: 'Family trip to the beach! So much fun!',
    liked: false,
    topics: ['friends_and_family'],
    image: Beach,
    time: '8h',
  },
];

const filter_periods = {
  Monday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
  ],
  Tuesday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
    // {
    //   timeStart: '18:00',
    //   timeEnd: '20:00',
    // },
  ],
  Wednesday: [],
  Thursday: [
    {
      timeStart: '10:00',
      timeEnd: '20:00',
    },
  ],
  Friday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
  ],
  Saturday: [
    {
      timeStart: '00:00',
      timeEnd: '22:59',
    },
  ],
  Sunday: [
    {
      timeStart: '00:00',
      timeEnd: '22:59',
    },
  ],
};

const pol_filter_periods = {
  Monday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
  ],
  Tuesday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
    {
      timeStart: '18:00',
      timeEnd: '20:00',
    },
  ],
  Wednesday: [],
  Thursday: [
    {
      timeStart: '10:00',
      timeEnd: '20:00',
    },
  ],
  Friday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
  ],
  Saturday: [
    {
      timeStart: '00:00',
      timeEnd: '22:59',
    },
  ],
  Sunday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
  ],
};

const general_filter_periods = {
  Monday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
  ],
  Tuesday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
    {
      timeStart: '14:00',
      timeEnd: '16:00',
    },
    {
      timeStart: '18:00',
      timeEnd: '20:00',
    },
  ],
  Wednesday: [],
  Thursday: [
    {
      timeStart: '10:00',
      timeEnd: '20:00',
    },
  ],
  Friday: [
    {
      timeStart: '10:00',
      timeEnd: '12:00',
    },
  ],
  Saturday: [
    {
      timeStart: '00:00',
      timeEnd: '22:59',
    },
  ],
  Sunday: [
    {
      timeStart: '09:00',
      timeEnd: '17:00',
    },
  ],
};

const topics = [
  {
    id: 't1',
    name: 'news',
    color: '#FF0000',
    filter_periods: pol_filter_periods,
  },
  {
    id: 't2',
    name: 'politics',
    color: '#FF0000',
    timeStart: '14:00',
    timeEnd: '16:00',
    filter_periods: pol_filter_periods,
  },
  {
    id: 't3',
    name: 'climate',
    color: '#FF0000',
    timeStart: '16:00',
    timeEnd: '18:00',
    filter_periods: filter_periods,
  },
  // {
  //   id: 't4',
  //   name: 'vehicles',
  //   color: '#FF0000',
  //   timeStart: '10:00',
  //   timeEnd: 13,
  //   filter_periods: filter_periods,
  // },
  {
    id: 't5',
    name: 'friends_and_family',
    color: '#FF0000',
    timeStart: '18:00',
    timeEnd: '20:00',
    custom: true,
    filter_periods: filter_periods,
    subtopics: ['friends', 'family'],
  },
  {
    id: 't6',
    name: 'friends',
    color: '#FF0000',
    timeStart: '18:00',
    timeEnd: '20:00',
    filter_periods: filter_periods,
  },
  {
    id: 't7',
    name: 'family',
    color: '#FF0000',
    timeStart: '18:00',
    timeEnd: '20:00',
    filter_periods: filter_periods,
  },
];

export {
  posts,
  topics,
  filter_periods as example_filter_periods,
  general_filter_periods,
};

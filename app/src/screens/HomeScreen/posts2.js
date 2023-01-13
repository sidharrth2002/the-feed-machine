// import { Beach, Stockholm } from '../../assets';
const fs = require('fs');

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
  {
    id: 't4',
    name: 'vehicles',
    color: '#FF0000',
    timeStart: '10:00',
    timeEnd: 13,
    filter_periods: filter_periods,
  },
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

fs.writeFile('general.json', JSON.stringify(general_filter_periods), err => {
  return err;
});

// export {
//   posts,
//   topics,
//   filter_periods as example_filter_periods,
//   general_filter_periods,
// };

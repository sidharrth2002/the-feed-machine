// random screen 'Screen Time' for 7 days before today
const options = {
  day: 'numeric',
  month: 'short',
};

const screen_time = [
  {
    // name: Date.now() - 6 * 24 * 60 * 60 * 1000,
    // format date to be readable in format day/month
    // do not include year
    name: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    // find day of week on the date
    day: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-UK',
      options
    ),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).getDay(),
  },
  {
    name: new Date(Date.now()).toLocaleDateString('en-UK', options),
    'Screen Time': Math.floor(Math.random() * 10),
    day: new Date(Date.now()).getDay(),
  },
];

const topic_distribution = [
  { name: 'Politics', value: 400 },
  { name: 'Sports', value: 300 },
  { name: 'Climate', value: 300 },
  { name: 'Technology', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export { screen_time, topic_distribution, COLORS };

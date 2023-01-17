const axios = require('axios');
const Topic = require('../models/topic.model');

const classify = async (text) => {
  // const topics = Topic.find();
  const topicNames = ['news', 'politics', 'climate', 'sports', 'entertainment', 'vehicles'];

  const response = await axios.post(
    'http://localhost:8080/classify/',
    {
      text,
      labels: topicNames,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
  // return response.data;
};

module.exports = {
  classify,
};

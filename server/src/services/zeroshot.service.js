const axios = require('axios');
const Topic = require('../models/topic.model');

const classify = async (text) => {
  const topics = Topic.find();
  const topicNames = topics.map((topic) => topic.name);
  const response = await axios.post('http://localhost:8000/classify', {
    text,
    labels: topicNames,
  });
  return response.data;
};

module.exports = {
  classify,
};

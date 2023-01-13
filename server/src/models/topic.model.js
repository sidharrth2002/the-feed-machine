const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const topicSchema = mongoose.Schema({
  id: {
    unique: true,
    type: String,
  },
  // name, color, timeStart, timeEnd, custom, filter_periods, subtopics
  color: {
    type: String,
    required: true,
    trim: true,
  },
  timeStart: {
    type: String,
    required: true,
    trim: true,
  },
  timeEnd: {
    type: String,
    required: true,
    trim: true,
  },
  custom: {
    type: Boolean,
    required: true,
  },
  filter_periods: {
    type: Object,
  },
  subtopics: [
    {
      type: String,
    },
  ],
});

topicSchema.plugin(toJSON);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;

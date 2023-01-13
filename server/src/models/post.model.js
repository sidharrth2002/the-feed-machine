const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const postSchema = mongoose.Schema({
  id: {
    unique: true,
    type: 'String',
  },
  user: {
    type: 'String',
    required: true,
    trim: true,
  },
  userPhoto: {
    type: 'String',
    required: true,
    trim: true,
  },
  body: {
    type: 'String',
    required: true,
    trim: true,
  },
  liked: {
    type: 'Boolean',
    required: true,
  },
  topics: [
    {
      type: 'String',
    },
  ],
  time: {
    type: 'String',
    required: true,
    trim: true,
  },
});

postSchema.plugin(toJSON);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

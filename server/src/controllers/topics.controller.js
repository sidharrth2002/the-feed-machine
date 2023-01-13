const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Topic = require('../models/topic.model');

const createTopic = catchAsync(async (req, res) => {
  const topic = await Topic.create(req.body);
  res.status(httpStatus.CREATED).send(topic);
});

const getTopics = catchAsync(async (req, res) => {
  const topics = await Topic.find();
  res.send(topics);
});

const updateTopic = catchAsync(async (req, res) => {
  const topic = await Topic.findById(req.body.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
  }
  Object.assign(topic, req.body);
  await topic.save();
  res.send(topic);
});

const deleteTopic = catchAsync(async (req, res) => {
  await Topic.findByIdAndDelete(req.body.topicId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateFilterPeriodForTopic = catchAsync(async (req, res) => {
  const topic = await Topic.findById(req.body.topicId);
  topic.filter_periods = req.body.filter_periods;
  await topic.save();
  res.send(topic);
});

module.exports = {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
  updateFilterPeriodForTopic,
};

// const createPost = catchAsync(async (req, res) => {
//   const post = await Post.create(req.body);
//   res.status(httpStatus.CREATED).send(post);
// });

// const getPosts = catchAsync(async (req, res) => {
//   const posts = await Post.find();
//   res.send(posts);
// });

// const toggleLike = catchAsync(async (req, res) => {
//   const post = await Post.findById(req.params.postId);
//   if (!post) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
//   }
//   post.liked = !post.liked;
//   await post.save();
//   res.send(post);
// });

// const deletePost = catchAsync(async (req, res) => {
//   await Post.findByIdAndDelete(req.params.postId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// module.exports = {
//   createPost,
//   getPosts,
//   toggleLike,
//   deletePost,
// };

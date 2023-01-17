const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post.model');
const { zeroShotService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  console.log(req.body);
  const label = await zeroShotService.classify(req.body.body);
  req.body.topics = [label];
  req.body.user = 'John Wayne';
  const post = await Post.create(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

const toggleLike = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  post.liked = !post.liked;
  await post.save();
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPosts,
  toggleLike,
  deletePost,
};

import {
  general_filter_periods,
  posts,
  topics,
} from '../../screens/HomeScreen/posts.js';

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: 'Sidharrth Nagappan',
    posts: [],
    filters: topics,
    filtering: true,
    manually_filter: [],
    manually_ignore: [],
    general_timing: general_filter_periods,
  },
  reducers: {
    TEST: state => {
      console.log('test');
    },
    SET_POSTS: (state, action) => {
      state.posts = action.payload.posts;
    },
    TOGGLE_LIKE: (state, action) => {
      state.posts.filter(post => post.id === action.payload.id)[0].liked =
        !state.posts.filter(post => post.id === action.payload.id)[0].liked;
    },
    TOGGLE_FILTERING: state => {
      state.filtering = !state.filtering;
    },
    ADD_FILTER: (state, action) => {
      state.filters.push({
        name: action.payload.name,
        description: action.payload.description,
        id: 'f' + state.filters.length + 1,
        subtopics: action.payload.subtopics,
      });
    },
    UPDATE_FILTER: (state, action) => {
      state.filters.filter(filter => filter.id === action.payload.id)[0].name =
        action.payload.name;
      state.filters.filter(
        filter => filter.id === action.payload.id
      )[0].description = action.payload.description;
      state.filters.filter(
        filter => filter.id === action.payload.id
      )[0].subtopics = action.payload.subtopics;
    },
    REMOVE_FILTER: (state, action) => {
      state.filters = state.filters.filter(
        filter => filter !== action.payload.filter
      );
    },
    ADD_MANUALLY_FILTER: (state, action) => {
      state.manually_filter.push(action.payload.filter);
    },
    REMOVE_MANUALLY_FILTER: (state, action) => {
      state.manually_filter = state.manually_filter.filter(
        filter => filter !== action.payload.filter
      );
    },
    ADD_MANUALLY_IGNORE: (state, action) => {
      state.manually_ignore.push(action.payload.filter);
    },
    REMOVE_MANUALLY_IGNORE: (state, action) => {
      state.manually_ignore = state.manually_ignore.filter(
        filter => filter !== action.payload.filter
      );
    },
    ADD_POST: (state, action) => {
      const post = action.payload.post;
      state.posts.push(post);
      // move last element to first of array
      // latest post is at the top
      console.log(state.posts);
      state.posts.unshift(state.posts.pop());
    },
    UPDATE_GENERAL_TIMING: (state, action) => {
      state.general_timing = action.payload.new_timing;
    },
    UPDATE_FILTER_PERIODS_FOR_TOPIC: (state, action) => {
      state.filters.filter(
        filter => filter.id === action.payload.id
      )[0].filter_periods = action.payload.filter_periods;
    },
  },
});

export const {
  TEST,
  SET_POSTS,
  TOGGLE_LIKE,
  ADD_POST,
  TOGGLE_FILTERING,
  ADD_FILTER,
  UPDATE_FILTER,
  ACTIVATE_FILTER,
  DEACTIVATE_FILTER,
  ADD_MANUALLY_FILTER,
  ADD_MANUALLY_IGNORE,
  REMOVE_MANUALLY_FILTER,
  REMOVE_MANUALLY_IGNORE,
  UPDATE_GENERAL_TIMING,
  UPDATE_FILTER_PERIODS_FOR_TOPIC,
} = authSlice.actions;
export default authSlice.reducer;

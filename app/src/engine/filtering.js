import DAYS from '../constants/days';
import { get } from 'lodash';
import moment from 'moment';

const filter_posts = (
  p,
  filters,
  manually_filter,
  manually_ignore,
  general_timing
) => {
  // filter posts based on filter timings

  const filtered_posts = p.filter(post => {
    let post_topics = post.topics;

    for (const topic of post_topics) {
      if (
        get(
          filters.find(filter => filter.name === topic.toLowerCase()),
          'custom',
          false
        ) === true
      ) {
        post_topics += filters.find(filter => filter.name === topic).subtopics;
      }
    }

    console.log('post_topics', post_topics);

    const today = DAYS[new Date().getDay()];

    for (const filter of manually_filter) {
      console.log('manually filter', filter);
      let subtopics = get(
        filters.find(f => f.name === filter),
        'subtopics',
        []
      );

      // if post topics includes filter or any of its subtopics, filter it out
      if (
        post_topics.includes(filter) ||
        subtopics.some(subtopic => post_topics.includes(subtopic))
      ) {
        return false;
      }
    }

    for (const filter of manually_ignore) {
      if (post_topics.includes(filter)) {
        return true;
      }
    }

    for (const filter of filters) {
      if (post_topics.includes(filter.name)) {
        const today_filters = filter.filter_periods[today];
        if (today_filters.length > 0) {
          for (const timing of today_filters) {
            // if type of timeStart is string, convert 'HH:MM' to number
            let startTime = timing.timeStart;
            let endTime = timing.timeEnd;
            let nowTime = moment().format('HH:mm');

            if (
              moment(nowTime, 'HH:mm').isBetween(
                moment(startTime, 'HH:mm'),
                moment(endTime, 'HH:mm')
              )
            ) {
              return false;
            }
          }
        }
      }
    }

    // check general timing to decide if post should be filtered out
    let today_timing = general_timing[today];
    if (today_timing && today_timing.length > 0) {
      for (const timing of today_timing) {
        let startTime = timing.timeStart;
        let endTime = timing.timeEnd;
        let nowTime = moment().format('HH:mm');

        if (moment(nowTime, 'HH:mm').isBetween(startTime, endTime)) {
          return false;
        }
      }
    }

    return true;
  });

  return filtered_posts;
};

const IS_FILTERING_ON = (generalTiming, forceFiltering) => {
  if (forceFiltering) {
    return true;
  }
  let timeNowHours = new Date().getHours();
  let timeNowMinutes = new Date().getMinutes();
  let today = DAYS[new Date().getDay()];
  let todayFilters = generalTiming[today];
  let isFilteringOn = false;
  for (let i = 0; i < todayFilters.length; i++) {
    let start = todayFilters[i].timeStart;
    if (typeof todayFilters[i].timeStart === 'string') {
      start = todayFilters[i].timeStart.split(':');
    }
    let end = todayFilters[i].timeEnd;
    if (typeof todayFilters[i].timeEnd === 'string') {
      end = todayFilters[i].timeEnd.split(':');
    }

    if (
      (timeNowHours > start[0] ||
        (timeNowHours === start[0] && timeNowMinutes >= start[1])) &&
      (timeNowHours < end[0] ||
        (timeNowHours === end[0] && timeNowMinutes <= end[1]))
    ) {
      isFilteringOn = true;
      break;
    }
  }

  return isFilteringOn;
};

const isTopicFilteredNow = (
  topic,
  filters,
  generalTiming,
  manually_filter,
  manually_ignore
) => {
  const filtering_periods = filters.find(
    filter => filter.name === topic
  ).filter_periods;
  const now = new Date();
  // get hour in 24h format
  const now_hour = now.getHours();
  const now_day = DAYS[now.getDay()];

  if (manually_filter.includes(topic)) {
    return true;
  }
  if (manually_ignore.includes(topic)) {
    return false;
  }

  for (const day in filtering_periods) {
    if (day === now_day) {
      for (const period of filtering_periods[day]) {
        let start = period.timeStart;
        let startHour = start;
        let startMinute = 0;
        if (typeof period.timeStart === 'string') {
          startHour = parseInt(start.split(':')[0]);
          startMinute = parseInt(start.split(':')[1]);
        }
        let end = period.timeEnd;
        let endHour = end;
        let endMinute = 0;
        if (typeof period.timeEnd === 'string') {
          endHour = parseInt(end.split(':')[0]);
          endMinute = parseInt(end.split(':')[1]);
        }

        let start_time = `${startHour}:${startMinute}`;
        let end_time = `${endHour}:${endMinute}`;
        let now_time = `${now_hour}:${now.getMinutes()}`;

        if (
          moment(now_time, 'HH:mm').isBetween(
            moment(start_time, 'HH:mm'),
            moment(end_time, 'HH:mm')
          )
        ) {
          return true;
        }
      }
    }
  }
  // also check the general timing to see if it should be filtered out

  // check general timing iff there are no filters set for this topic today
  if (filtering_periods[now_day].length === 0) {
    let today = DAYS[now.getDay()];
    for (const period of generalTiming[today]) {
      let start = period.timeStart;
      let startHour = start;
      let startMinute = 0;
      if (typeof start === 'string') {
        startHour = parseInt(start.split(':')[0]);
        startMinute = parseInt(start.split(':')[1]);
      }
      let end = period.timeEnd;
      let endHour = end;
      let endMinute = 0;
      if (typeof end === 'string') {
        endHour = parseInt(end.split(':')[0]);
        endMinute = parseInt(end.split(':')[1]);
      }

      let start_time = `${startHour}:${startMinute}`;
      let end_time = `${endHour}:${endMinute}`;
      let now_time = `${now_hour}:${now.getMinutes()}`;

      if (
        moment(now_time, 'HH:mm').isBetween(
          moment(start_time, 'HH:mm'),
          moment(end_time, 'HH:mm')
        )
      ) {
        return true;
      }
    }
  }

  return false;
};

export { filter_posts, IS_FILTERING_ON, isTopicFilteredNow };

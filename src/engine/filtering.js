import DAYS from '../constants/days';

const filter_posts = (p, filters, manually_filter, manually_ignore) => {
  // filter posts based on filter timings
  console.log('filtering posts');
  const filtered_posts = p.filter(post => {
    console.log('called');
    const post_topics = post.topics;
    const now = new Date();
    const timeNowHours = now.getHours();
    const timeNowMinutes = now.getMinutes();
    const today = DAYS[new Date().getDay()];

    for (const filter of manually_filter) {
      if (post_topics.includes(filter)) {
        console.log('manually filter');
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
        // check if manually_filter contains any element in post_topics
        // if so, filter out the post

        // if (manually_filter.includes(filter.name)) {
        //   return false;
        // }
        // if (manually_ignore.includes(filter.name)) {
        //   return true;
        // }

        const today_filters = filter.filter_periods[today];
        if (today_filters.length > 0) {
          for (const timing of today_filters) {
            // if type of timeStart is string, convert 'HH:MM' to number
            let startTime = timing.timeStart;
            if (typeof timing.timeStart === 'string') {
              startTime = new Date(`1970-01-01T${timing.timeStart}:00.000Z`);
            }

            let endTime = timing.timeEnd;
            // if type of timeEnd is string, convert 'HH:MM' to number
            if (typeof timing.timeEnd === 'string') {
              endTime = new Date(`1970-01-01T${timing.timeEnd}:00.000Z`);
            }

            // post should be filtered out if timeNow is between timeStart and timeEnd
            if (
              timeNowHours > startTime.getHours() &&
              timeNowHours < endTime.getHours()
            ) {
              return false;
            }
            // if timeNow is equal to timeStart, check minutes
            if (timeNowHours === startTime.getHours()) {
              if (timeNowMinutes >= startTime.getMinutes()) {
                return false;
              } else {
                return true;
              }
            }
            // if timeNow is equal to timeEnd, check minutes
            if (timeNowHours === endTime.getHours()) {
              if (timeNowMinutes <= endTime.getMinutes()) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      }
    }

    // if general filter timing is not on, then it's ok to show the post as we don't care
    // general_timing = general_timing[today];
    // if (general_timing.length === 0) {
    //   return true;
    // }
    // for (const timeSet of general_timing) {
    //   // if type of timeStart is string, convert 'HH:MM' to number
    //   let startTime = timeSet.timeStart;
    //   let startHours = startTime;
    //   let startMinutes = 0;
    //   if (typeof timeSet.timeStart === 'string') {
    //     startHours = timeSet.timeStart.split(':')[0];
    //     startMinutes = timeSet.timeStart.split(':')[1];
    //   }

    //   let endTime = timeSet.timeEnd;
    //   let endHours = endTime;
    //   let endMinutes = 0;
    //   // if type of timeEnd is string, convert 'HH:MM' to number
    //   if (typeof timeSet.timeEnd === 'string') {
    //     endHours = timeSet.timeEnd.split(':')[0];
    //     endMinutes = timeSet.timeEnd.split(':')[1];
    //   }
    // }

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

        // if timeNow is between timeStart and timeEnd, then this topic is filtered
        if (
          now_hour > startHour &&
          now_hour < endHour &&
          now.getMinutes() >= startMinute &&
          now.getMinutes() <= endMinute
        ) {
          return true;
        }

        // if (
        //   now_hour > startHour ||
        //   (now_hour === startHour && now.getMinutes() >= startMinute)
        // ) {
        //   if (
        //     now_hour < endHour ||
        //     (now_hour === endHour && now.getMinutes() <= endMinute)
        //   ) {
        //
        //     return true;
        //   }
        // }
      }
    }
  }
  // also check the general timing to see if it should be filtered out
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

    // if timeNow is between timeStart and timeEnd, then this topic is filtered
    if (
      now_hour > startHour &&
      now_hour < endHour &&
      now.getMinutes() >= startMinute &&
      now.getMinutes() <= endMinute
    ) {
      return true;
    }

    // if (
    //   now_hour > startHour ||
    //   (now_hour === startHour && now.getMinutes() >= startMinute)
    // ) {
    //   if (
    //     now_hour < endHour ||
    //     (now_hour === endHour && now.getMinutes() <= endMinute)
    //   ) {
    //     return true;
    //   }
    // }
  }

  return false;
};

export { filter_posts, IS_FILTERING_ON, isTopicFilteredNow };

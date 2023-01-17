import { FaCar, FaGlobe, FaNewspaper, FaPeopleCarry } from 'react-icons/fa';

import { BiCloud } from 'react-icons/bi';
import { GiFamilyHouse } from 'react-icons/gi';

const topic_icons = {
  politics: FaGlobe,
  news: FaNewspaper,
  friends: FaPeopleCarry,
  family: GiFamilyHouse,
  vehicles: FaCar,
  climate: BiCloud,
};

const get_topic_icon = topic => {
  // check if topic is in topic_icons
  console.log(topic);
  if (topic in topic_icons) {
    return topic_icons[topic];
  } else {
    return FaGlobe;
  }

  // if (topic_icons[topic]) {
  //   return topic_icons[topic];
  // } else {
  //   return FaGlobe;
  // }
};

export { get_topic_icon };

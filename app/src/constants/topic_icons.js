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
  if (topic_icons[topic]) {
    return topic_icons[topic];
  } else {
    return FaGlobe;
  }
};

export { get_topic_icon };

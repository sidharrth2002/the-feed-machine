const make_topic_name_presentable = topic_name => {
  // capitalize first letter
  topic_name = topic_name.charAt(0).toUpperCase() + topic_name.slice(1);
  // replace underscores with spaces
  topic_name = topic_name.replace(/_/g, ' ');
  return topic_name;
};

const change_topic_name_to_id = topic_name => {
  // replace spaces with underscores
  topic_name = topic_name.replace(/ /g, '_');
  // lowercase all letters
  topic_name = topic_name.toLowerCase();
  return topic_name;
};

export { make_topic_name_presentable, change_topic_name_to_id };

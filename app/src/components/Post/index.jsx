import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import { BiShare } from 'react-icons/bi';
import { TOGGLE_LIKE } from '../../features/counter';
import assets from '../../assets';
import axios from 'axios';
import { get } from 'lodash';
import { get_topic_icon } from '../../constants/topic_icons';
import { make_topic_name_presentable } from '../../utils';
import { useDispatch } from 'react-redux';

export default function Post(props) {
  const { id, body, user, image, liked, time, feed_filtering, userPhoto } =
    props;
  const dispatch = useDispatch();
  const toast = useToast();

  const toggleLike = () => {
    axios.patch(`http://localhost:8000/v1/posts/${id}`).then(res => {
      dispatch(TOGGLE_LIKE({ id: get(props, 'id', null) }));
    });
  };

  return (
    <Box
      width={'100%'}
      minHeight={180}
      borderRadius={10}
      borderWidth={0.5}
      padding={5}
      mb={2}
      boxShadow={'md'}
    >
      <Flex justifyContent={'space-between'} alignItems="center" mb={3}>
        <HStack spacing={3}>
          {/* <Icon as={CgProfile} boxSize={8} /> */}
          <Image
            src={get(assets, userPhoto?.split('.')[0], 'sid')}
            maxW={10}
            borderRadius={'50%'}
          />
          <Text textOverflow={'ellipsis'} maxW={90}>
            {user}
          </Text>
          <Text color="gray">{time}</Text>
        </HStack>
        <Box>
          {feed_filtering && (
            <VStack
              justifyContent={'flex-end'}
              alignItems="flex-end"
              width={'100%'}
            >
              <Box background>
                <Icon
                  as={get_topic_icon(
                    props.topics && props.topics.length >= 1
                      ? props.topics[0]
                      : 'news'
                  )}
                  boxSize={6}
                  mb={-2}
                  color="#0053d6"
                  alignSelf={'flex-end'}
                />
              </Box>
              <Text maxW={70} fontSize={12} textAlign="right">
                {props.topics && props.topics.length >= 1
                  ? make_topic_name_presentable(props.topics[0])
                  : make_topic_name_presentable('news')}
              </Text>
            </VStack>
          )}
        </Box>
      </Flex>
      <VStack spacing={4}>
        <Text>{body}</Text>
        {image && (
          <Image
            src={get(assets, image?.split('.')[0])}
            width="100%"
            borderRadius={10}
          />
        )}
        <HStack justifyContent={'flex-start'} width="100%">
          <Box
            // onClick={e => {
            //   console.log(e.detail);
            //   if (e.detail === 2) {
            //     dispatch(TOGGLE_LIKE({ id: get(props, 'id', null) }));
            //   }
            // }}
            onDoubleClick={e => {
              toggleLike();
              // dispatch(TOGGLE_LIKE({ id: get(props, 'id', null) }));
            }}
            display={'flex'}
            alignItems={'center'}
          >
            <Icon
              as={liked ? FaThumbsUp : FaRegThumbsUp}
              boxSize={5}
              color={'#4267B2'}
              mr={2}
            />
            <Text fontSize={14} color="gray" mr={3}>
              Like
            </Text>
            <Icon
              as={BiShare}
              boxSize={5}
              onClick={() =>
                toast({
                  title: 'Sharing',
                  description: 'This feature is not available yet.',
                  status: 'info',
                  duration: 2000,
                  isClosable: true,
                })
              }
            />
            <Text fontSize={14} color="gray" ml={2}>
              Share
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}

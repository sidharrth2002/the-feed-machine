import { ADD_POST, SET_POSTS } from '../../features/counter';
import {
  Box,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { CgPin, CgProfile } from 'react-icons/cg';
import { FaClock, FaFilter, FaHome, FaImage, FaPlus } from 'react-icons/fa';
import { IS_FILTERING_ON, filter_posts } from '../../engine/filtering';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NiceButton from '../../components/Button';
import Post from '../../components/Post';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function HomeScreen() {
  // const auth = useSelector(state => state.auth);
  const posts = useSelector(state => state.auth.posts);
  const filters = useSelector(state => state.auth.filters);
  const generalTiming = useSelector(state => state.auth.general_timing);
  const filtering = useSelector(state => state.auth.filtering);
  const manually_filter = useSelector(state => state.auth.manually_filter);
  const manually_ignore = useSelector(state => state.auth.manually_ignore);
  const user = useSelector(state => state.user);
  const [newPost, setNewPost] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenClock,
    onOpen: onOpenClock,
    onClose: onCloseClock,
  } = useDisclosure();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const add_post = post_body => {
    const new_post = {
      id: 'p' + posts.length + 1,
      user: user,
      body: post_body,
      liked: false,
      userPhoto: 'sid.jpeg',
      time: '0h',
      topics: [],
    };
    axios.post('http://localhost:8000/v1/posts', new_post).then(res => {
      console.log(res.data);
      console.log('DISPATCHING');
      dispatch(
        ADD_POST({
          post: res.data,
        })
      );
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/v1/posts').then(res => {
      dispatch(
        SET_POSTS({
          posts: res.data,
        })
      );
      setLoading(false);
    });
  }, []);

  return (
    <Box padding="0rem">
      <Flex
        justifyContent={'space-between'}
        alignItems="center"
        paddingX={'1.3rem'}
        paddingY={'1rem'}
      >
        <Text fontSize={'28'} color="#0053d6" lineHeight={1} maxW={'40%'}>
          feed machine
        </Text>
        <HStack spacing={2}>
          <HStack
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            textAlign="center"
            spacing={2}
            padding={2}
            backgroundColor={'#2C365E'}
            height={10}
            onClick={onOpenClock}
          >
            <Icon as={FaClock} boxSize={5} color={'white'} />
          </HStack>
          <HStack
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            textAlign="center"
            spacing={2}
            padding={2}
            backgroundColor={'#0053d6'}
            height={10}
            onClick={onOpen}
          >
            <Icon as={FaPlus} boxSize={5} color={'white'} />
            <Text color={'white'}>Add Post</Text>
          </HStack>
        </HStack>
        {/* <HStack spacing={2}>
          <HStack
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            textAlign="center"
            spacing={2}
            padding={2}
            backgroundColor={'#0053d6'}
            height={10}
          >
            <Icon
              as={FaFilter}
              boxSize={4}
              color={'white'}
              onClick={() => history.push('/filters')}
            />
            <Text color={'white'}>Filter</Text>
          </HStack>
          <HStack
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            textAlign="center"
            spacing={2}
            padding={2}
            backgroundColor={'#0053d6'}
            height={10}
          >
            <Icon as={FaClock} boxSize={5} color={'white'} />
            <Text color={'white'}>Time</Text>
          </HStack>
          <HStack
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            textAlign="center"
            spacing={2}
            padding={2}
            backgroundColor={'#0053d6'}
            height={10}
          >
            <Icon
              as={CgProfile}
              boxSize={6}
              color={'white'}
              onClick={() => {
                history.push('/profile');
              }}
            />
          </HStack>
        </HStack> */}
      </Flex>
      <HStack paddingBottom={3} borderBottom={'1px solid #e6e6e6'}>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          borderBottom={'2px solid #0053d6'}
          paddingY={3}
          onClick={() => history.push('/home')}
        >
          <Icon as={FaHome} boxSize={7} color={'#0053d6'} />
          <Text color={'#0053d6'}>Home</Text>
        </HStack>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          onClick={() => history.push('/filters')}
        >
          <Icon as={FaFilter} boxSize={5} />
          <Text>Filtering</Text>
        </HStack>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          onClick={() => history.push('/profile')}
        >
          <Icon as={CgProfile} boxSize={7} />
          <Text>Profile</Text>
        </HStack>
      </HStack>
      <Skeleton isLoaded={!loading}>
        <VStack mt={1}>
          {/* messy but works */}
          {IS_FILTERING_ON(generalTiming, filtering) && posts.length > 0
            ? filter_posts(
                posts,
                filters,
                manually_filter,
                manually_ignore
              ).map((post, index) => (
                <Post
                  key={post.id}
                  topics={post.topics}
                  feed_filtering
                  {...post}
                />
              ))
            : posts.map((post, index) => (
                <Post key={post.id} topics={post.topics} {...post} />
              ))}
          <Post />
        </VStack>
      </Skeleton>
      <Modal isOpen={isOpenClock} onClose={onCloseClock}>
        <Box padding={2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Time Now</ModalHeader>
          </ModalContent>
        </Box>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box padding={2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                size="sm"
                minLength={1}
              />{' '}
            </ModalBody>

            <ModalFooter>
              <HStack spacing={4}>
                <Icon as={CgPin} boxSize={7} />
                <Icon as={FaImage} boxSize={7} />
                <NiceButton
                  text="Post"
                  onClick={() => {
                    if (newPost.length > 0) {
                      // dispatch(ADD_POST({ body: newPost }));
                      add_post(newPost);
                    }
                    onClose();
                  }}
                />
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </Box>
  );
}

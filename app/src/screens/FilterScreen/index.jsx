import {
  ADD_MANUALLY_FILTER,
  ADD_MANUALLY_IGNORE,
  REMOVE_MANUALLY_FILTER,
  REMOVE_MANUALLY_IGNORE,
  TOGGLE_FILTERING,
} from '../../features/counter';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { CgPen, CgProfile } from 'react-icons/cg';
import { FaEdit, FaFilter, FaHome, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import ClockIcon from '../../assets/clock.svg';
import { GiTimeBomb } from 'react-icons/gi';
import NiceButton from '../../components/Button';
import { isTopicFilteredNow } from '../../engine/filtering';
import { make_topic_name_presentable } from '../../utils';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function FilterScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filteringOn = useSelector(state => state.auth.filtering);
  const filters = useSelector(state => state.auth.filters);
  const generalTiming = useSelector(state => state.auth.general_timing);
  const manually_filter = useSelector(state => state.auth.manually_filter);
  const manually_ignore = useSelector(state => state.auth.manually_ignore);

  useEffect(() => {
    // open information modal only once at the start
    onOpen();
  }, [onOpen]);

  return (
    <Box padding="0rem">
      <HStack borderBottom={'1px solid #e6e6e6'} px={3}>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          onClick={() => history.push('/home')}
          py={4}
        >
          <Icon as={FaHome} boxSize={7} />
          <Text>Home</Text>
        </HStack>

        <HStack
          justifyContent={'center'}
          width={'33%'}
          height={'100%'}
          paddingY={3}
          onClick={() => history.push('/filters')}
          py={4}
          borderBottom={'2px solid #0053d6'}
        >
          <Icon color={'#0053d6'} as={FaFilter} boxSize={5} />
          <Text color={'#0053d6'}>Filtering</Text>
        </HStack>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          py={4}
          onClick={() => history.push('/profile')}
        >
          <Icon as={CgProfile} boxSize={7} />
          <Text>Profile</Text>
        </HStack>
      </HStack>
      <Box padding={4} width="100%" pt={6} pl={8} pr={8}>
        <HStack mb={3}>
          {/* <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} /> */}
          <Heading fontWeight={500}>Filters</Heading>
        </HStack>
        <Box mb={5}>
          <Link color={'blue.900'} onClick={onOpen}>
            How does this work?
          </Link>
        </Box>
        <VStack width={'100%'} alignItems={'start'} spacing={4} mb={5}>
          <Heading fontSize={'1.5rem'} fontWeight={500}>
            Settings
          </Heading>
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            alignItems="center"
          >
            <Text fontSize={'1.2rem'}>On/Off</Text>
            <Switch
              onChange={e => {
                dispatch(TOGGLE_FILTERING());
              }}
              isChecked={filteringOn}
            />
          </Flex>
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            alignItems="center"
          >
            <Text fontSize={'1.2rem'}>General Timing</Text>
            <Icon
              as={GiTimeBomb}
              boxSize={8}
              onClick={() => history.push('/timing')}
            />
          </Flex>
        </VStack>
        <Box display={filteringOn ? 'block' : 'none'}>
          <VStack width={'100%'} alignItems={'start'} spacing={4} mb={5}>
            <Heading fontSize={'1.5rem'} fontWeight={500}>
              Topics
            </Heading>
            {filters
              .filter(filter => filter.custom !== true)
              .map((filter, index) => {
                return (
                  <Flex
                    width={'100%'}
                    justifyContent={'space-between'}
                    alignItems="center"
                    key={index}
                  >
                    <Text fontSize={'1.2rem'}>
                      {make_topic_name_presentable(filter.name)}
                    </Text>
                    <HStack>
                      {/* <Icon
                      as={FaClock}
                      boxSize={6}
                      onClick={() => {
                        history.push(`/timing/${filter.name}`);
                      }}
                    /> */}
                      <Icon
                        as={CgPen}
                        boxSize={6}
                        color={'#0053d6'}
                        onClick={() => {
                          history.push(`/edit-topic/${filter.name}`);
                        }}
                      />

                      <Image
                        maxW={7}
                        src={ClockIcon}
                        onClick={() => {
                          history.push(`/timing/${filter.name}`);
                        }}
                      />
                      <Switch
                        onChange={e => {
                          // going from off to on means it needs to be manually filtered
                          if (e.target.checked) {
                            dispatch(
                              ADD_MANUALLY_FILTER({ filter: filter.name })
                            );
                            dispatch(
                              REMOVE_MANUALLY_IGNORE({ filter: filter.name })
                            );
                          } else {
                            dispatch(
                              REMOVE_MANUALLY_FILTER({ filter: filter.name })
                            );
                            dispatch(
                              ADD_MANUALLY_IGNORE({ filter: filter.name })
                            );
                          }
                        }}
                        isChecked={
                          isTopicFilteredNow(
                            filter.name,
                            filters,
                            generalTiming,
                            manually_filter,
                            manually_ignore
                          ) ||
                          (manually_filter.includes(filter.name) &&
                            !manually_ignore.includes(filter.name))
                        }
                      />
                    </HStack>
                  </Flex>
                );
              })}
          </VStack>
          <VStack width={'100%'} alignItems={'start'} spacing={4} mb={5}>
            <Heading fontSize={'1.5rem'} fontWeight={500}>
              Custom Topics
            </Heading>
            {filters
              .filter(filter => filter.custom === true)
              .map((filter, index) => {
                return (
                  <Flex
                    width={'100%'}
                    justifyContent={'space-between'}
                    alignItems="center"
                    key={index}
                  >
                    <Text fontSize={'1.2rem'}>
                      {make_topic_name_presentable(filter.name)}
                    </Text>
                    <HStack>
                      {/* <Icon as={FaClock} boxSize={6} onClick={() => {
                        history.push(`/timing/${filter.name}`);
                      }} /> */}
                      <Icon
                        as={CgPen}
                        boxSize={6}
                        color={'#0053d6'}
                        onClick={() => {
                          history.push(`/edit-topic/${filter.name}`);
                        }}
                      />
                      <Image
                        maxW={7}
                        src={ClockIcon}
                        onClick={() => {
                          history.push(`/timing/${filter.name}`);
                        }}
                      />

                      <Switch
                        onChange={e => {
                          // going from off to on means it needs to be manually filtered
                          if (e.target.checked) {
                            dispatch(
                              ADD_MANUALLY_FILTER({ filter: filter.name })
                            );
                            dispatch(
                              REMOVE_MANUALLY_IGNORE({ filter: filter.name })
                            );
                          } else {
                            dispatch(
                              REMOVE_MANUALLY_FILTER({ filter: filter.name })
                            );
                            dispatch(
                              ADD_MANUALLY_IGNORE({ filter: filter.name })
                            );
                          }
                        }}
                        isChecked={
                          isTopicFilteredNow(
                            filter.name,
                            filters,
                            generalTiming,
                            manually_filter,
                            manually_ignore
                          ) ||
                          (manually_filter.includes(filter.name) &&
                            !manually_ignore.includes(filter.name))
                        }
                      />
                    </HStack>
                  </Flex>
                );
              })}
          </VStack>
          <HStack
            width={'100%'}
            justifyContent="start"
            alignItems={'center'}
            onClick={() => {
              history.push('/build-topic');
            }}
          >
            <Icon color={'gray'} as={FaPlus} boxSize={4} />
            <Text color={'gray'} fontSize={'1.2rem'}>
              Add a topic
            </Text>
          </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>How does filtering work?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                You can customise general timing and topic-specific timing.
              </Text>

              <UnorderedList mb={3}>
                <ListItem>
                  General timing: the overall period in which filtering runs on
                  your feed every day.
                </ListItem>
                <ListItem>
                  Topic-specific timing: allows you to set up filtering periods
                  for each topic.
                </ListItem>
              </UnorderedList>
              <Text>
                Note: Topic-specific timing can override general timing (e.g. if
                you set a topic to be filtered outside the general filtering
                period).
              </Text>
            </ModalBody>
            <ModalFooter>
              <NiceButton text="Got it!" onClick={onClose}></NiceButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NiceButton from '../../components/Button';
import { UPDATE_FILTER_PERIODS_FOR_TOPIC } from '../../features/counter';
import { make_topic_name_presentable } from '../../utils';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const mui_theme = createTheme();

function numDigits(x) {
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

export default function TopicTimingScreen(props) {
  const { match } = props;
  const topic_name = match.params.topic;

  const history = useHistory();
  const filters = useSelector(state => state.auth.filters);

  const td = filters.filter(topic => topic.name === topic_name)[0][
    'filter_periods'
  ];
  const topic = filters.filter(topic => topic.name === topic_name)[0];
  const [topic_data, setTopicData] = useState(td);
  const [day, setDay] = useState('');
  const [index, setIndex] = useState(0);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  return (
    <Box minHeight={'100vh'} padding={4} width="100%" pt={8} pl={8} pr={8}>
      <HStack mb={3}>
        <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} />
        <Heading fontSize={'1.8rem'} fontWeight={500}>
          {make_topic_name_presentable(topic_name)} Timing
        </Heading>
      </HStack>
      <Heading fontSize={'1.3rem'} fontWeight={500} mb={4}>
        When do you want to filter out posts related to this topic?
      </Heading>

      <Accordion>
        {Object.keys(topic_data).map((key, index) => {
          return (
            <AccordionItem key={key + index}>
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                boxShadow={'md'}
                width={'100%'}
                minHeight={90}
                borderRadius={10}
                borderWidth={0.5}
                padding={5}
                mb={2}
              >
                <AccordionButton>
                  {/* 50% circle progress bar */}
                  <HStack spacing={3}>
                    <CircularProgress
                      value={topic_data[key].length === 0 ? 0 : 50}
                      size="40px"
                      color="green.400"
                    />
                    <VStack
                      justifyContent={'flex-start'}
                      alignItems="flex-start"
                      width="100%"
                      spacing={0.3}
                    >
                      <Heading fontSize={'1.2rem'} fontWeight={500}>
                        {key}
                      </Heading>
                      <Text>
                        {topic_data[key].length === 0 ? 'No' : 'Partial'}{' '}
                        Filtering
                      </Text>
                    </VStack>
                  </HStack>
                </AccordionButton>
              </Flex>
              <AccordionPanel>
                {topic_data[key].map((k, index) => {
                  return (
                    <HStack key={k + index} spacing={4} mb={5}>
                      <ThemeProvider theme={mui_theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Start Time"
                            inputFormat="HH:mm"
                            value={`0000-00-00T${
                              numDigits(topic_data[key][index].timeStart) === 2
                                ? topic_data[key][index].timeStart
                                : `${topic_data[key][index].timeStart}:00`
                            }:00`}
                            onChange={e => {
                              console.log(e);
                              let new_timings = {
                                ...topic.filter_periods,
                                [key]: [
                                  ...topic.filter_periods[key].slice(0, index),
                                  {
                                    ...topic.filter_periods[key][index],
                                    timeStart: e.format('HH:mm'),
                                  },
                                  ...topic.filter_periods[key].slice(
                                    index + 1,
                                    topic.filter_periods[key].length
                                  ),
                                ],
                              };
                              dispatch(
                                UPDATE_FILTER_PERIODS_FOR_TOPIC({
                                  id: topic.id,
                                  filter_periods: new_timings,
                                })
                              );
                              setTopicData(new_timings);
                            }}
                            renderInput={params => <TextField {...params} />}
                          />
                          <TimePicker
                            label="End Time"
                            inputFormat="HH:mm"
                            value={`0000-00-00T${
                              numDigits(topic_data[key][index].timeEnd) === 2
                                ? topic_data[key][index].timeEnd
                                : `${topic_data[key][index].timeEnd}:00`
                            }:00`}
                            onChange={e => {
                              // check that end time is greater than start time
                              if (
                                e.format('HH:mm') <
                                topic_data[key][index].timeStart
                              ) {
                                toast({
                                  title: 'Error',
                                  description:
                                    'End time cannot be less than start time',
                                  status: 'error',
                                  duration: 5000,
                                  isClosable: true,
                                });
                                return;
                              }

                              let new_timings = {
                                ...topic.filter_periods,
                                [key]: [
                                  ...topic.filter_periods[key].slice(0, index),
                                  {
                                    ...topic.filter_periods[key][index],
                                    timeEnd: e.format('HH:mm'),
                                  },
                                  ...topic.filter_periods[key].slice(
                                    index + 1,
                                    topic.filter_periods[key].length
                                  ),
                                ],
                              };
                              dispatch(
                                UPDATE_FILTER_PERIODS_FOR_TOPIC({
                                  id: topic.id,
                                  filter_periods: new_timings,
                                })
                              );
                              setTopicData(new_timings);
                            }}
                            renderInput={params => <TextField {...params} />}
                          />
                          <Icon
                            as={FaTrash}
                            boxSize={18}
                            onClick={() => {
                              setDay(key);
                              setIndex(index);
                              onOpen();
                            }}
                          />
                        </LocalizationProvider>
                      </ThemeProvider>
                    </HStack>
                  );
                })}
                <HStack
                  spacing={2}
                  cursor={'pointer'}
                  onClick={() => {
                    let new_timings = {
                      ...topic.filter_periods,
                      [key]: [
                        ...topic.filter_periods[key],
                        {
                          timeStart: '00:00',
                          timeEnd: '00:00',
                        },
                      ],
                    };
                    dispatch(
                      UPDATE_FILTER_PERIODS_FOR_TOPIC({
                        id: topic.id,
                        filter_periods: new_timings,
                      })
                    );
                    setTopicData(new_timings);
                  }}
                >
                  <Icon as={FaPlus} boxSize={4} />
                  <Text fontSize={'1.1rem'}>Add another time set</Text>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>Are you sure you want to delete this time set?</Text>
          </ModalBody>
          <ModalFooter justifyContent={'space-between'} alignItems={'center'}>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <NiceButton
              onClick={() => {
                let new_timings = {
                  ...topic.filter_periods,
                  [day]: [
                    ...topic.filter_periods[day].slice(0, index),
                    ...topic.filter_periods[day].slice(
                      index + 1,
                      topic.filter_periods[day].length
                    ),
                  ],
                };
                dispatch(
                  UPDATE_FILTER_PERIODS_FOR_TOPIC({
                    id: topic.id,
                    filter_periods: new_timings,
                  })
                );
                setTopicData(new_timings);

                onClose();
              }}
              mt={0}
              text={'Delete'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

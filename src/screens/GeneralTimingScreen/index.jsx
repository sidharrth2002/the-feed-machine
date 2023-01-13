/* eslint-disable no-unused-vars */
import './custom.css';

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
import { ThemeProvider, createTheme } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NiceButton from '../../components/Button';
import TextField from '@mui/material/TextField';
import { UPDATE_GENERAL_TIMING } from '../../features/counter';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function numDigits(x) {
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

const mui_theme = createTheme();

export default function TimingScreen() {
  const history = useHistory();
  const general_timing = useSelector(state => state.auth.general_timing);
  const [timings, setTimings] = useState(general_timing);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [day, setDay] = useState('');
  const [index, setIndex] = useState(0);
  const toast = useToast();

  return (
    <Box minHeight={'100vh'} padding={4} width="100%" pt={8} pl={8} pr={8}>
      <HStack mb={3}>
        <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} />
        <Heading fontWeight={500}>General Timing</Heading>
      </HStack>
      <Heading fontSize={'1.3rem'} fontWeight={500} mb={4}>
        When do you want to apply filtering to your feed?
      </Heading>
      <Text fontSize={'1.1rem'} mb={4}>
        You can choose when feed filtering should be applied on each day. This
        is the default filtering time for all topic filters and will be used
        unless overridden by custom timings for specific topics.
      </Text>
      <Accordion>
        {Object.keys(timings).map((key, index) => {
          return (
            <AccordionItem key={index}>
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
                      value={timings[key].length === 0 ? 0 : 50}
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
                        {timings[key].length === 0 ? 'No' : 'Partial'} Filtering
                      </Text>
                    </VStack>
                  </HStack>
                  {/* <Icon
                    as={FaClock}
                    boxSize={6}
                    onClick={() => {
                      setDay(key);
                      onOpen();
                    }}
                  /> */}
                </AccordionButton>
              </Flex>
              <AccordionPanel>
                {timings[key].map((k, index) => {
                  // change hour to 24 hour day js
                  return (
                    <HStack key={index} spacing={4} mb={5}>
                      <ThemeProvider theme={mui_theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Start Time"
                            inputFormat="HH:mm"
                            value={`0000-00-00T${
                              numDigits(timings[key][index].timeStart) === 2
                                ? timings[key][index].timeStart
                                : `${timings[key][index].timeStart}:00`
                            }:00`}
                            onChange={value => {
                              let new_timing = {
                                ...timings,
                                [key]: [
                                  ...timings[key].slice(0, index),
                                  {
                                    ...timings[key][index],
                                    timeStart: value.format('HH:mm'),
                                  },
                                  ...timings[key].slice(index + 1),
                                ],
                              };
                              setTimings(new_timing);
                              UPDATE_GENERAL_TIMING({
                                new_timing,
                              });
                            }}
                            renderInput={params => <TextField {...params} />}
                          />
                          <TimePicker
                            label="End Time"
                            inputFormat="HH:mm"
                            value={`0000-00-00T${
                              numDigits(timings[key][index].timeEnd) === 2
                                ? timings[key][index].timeEnd
                                : `${timings[key][index].timeEnd}:00`
                            }:00`}
                            onChange={value => {
                              // check that end time is greater than start time
                              if (
                                value.format('HH:mm') <
                                timings[key][index].timeStart
                              ) {
                                toast({
                                  title: 'Error',
                                  description:
                                    'End time cannot be less than start time',
                                  status: 'error',
                                  duration: 5000,
                                  isClosable: true,
                                });
                              }

                              let new_timing = {
                                ...timings,
                                [key]: [
                                  ...timings[key].slice(0, index),
                                  {
                                    ...timings[key][index],
                                    timeEnd: value.format('HH:mm'),
                                  },
                                  ...timings[key].slice(index + 1),
                                ],
                              };
                              setTimings(new_timing);
                              UPDATE_GENERAL_TIMING({
                                new_timing,
                              });
                            }}
                            renderInput={params => <TextField {...params} />}
                          />
                          <Icon
                            as={FaTrash}
                            boxSize={18}
                            color={'#90323D'}
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
                  onClick={() =>
                    setTimings({
                      ...timings,
                      [key]: [
                        ...timings[key],
                        {
                          timeStart: '00:00',
                          timeEnd: '00:00',
                        },
                      ],
                    })
                  }
                  spacing={2}
                  cursor={'pointer'}
                >
                  <Icon color={'grey'} as={FaPlus} boxSize={4} />
                  <Text>Add another time set</Text>
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
                setTimings({
                  ...timings,
                  [day]: [
                    ...timings[day].slice(0, index),
                    ...timings[day].slice(index + 1),
                  ],
                });
                onClose();
              }}
              mt={0}
              text={'Delete'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtering on {day}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>
              Select times feed filtering should run during the day.
            </Text>
            <VStack>
              {general_timing[day].map((key, index) => {

                // change hour to 24 hour day js
                let start = dayjs(`0000-00-00T${key.timeStart}:00:00`).format(
                  'HH:mm'
                );

                return (
                  <HStack>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        key={index}
                        label="Time"
                        value={start}
                        onChange={value => {

                          setTimings({
                            ...timings,
                            [day]: [
                              ...timings[day].slice(0, index),
                              {
                                ...timings[day][index],
                                timeStart: value,
                              },
                              ...timings[day].slice(index + 1),
                            ],
                          });
                        }}
                        renderInput={params => <TextField {...params} />}
                      />
                      <TimePicker
                        key={index}
                        label="Time"
                        value={key.endTime}
                        onChange={value => {

                          setTimings({
                            ...timings,
                            [day]: [
                              ...timings[day].slice(0, index),
                              {
                                ...timings[day][index],
                                endTime: value,
                              },
                              ...timings[day].slice(index + 1),
                            ],
                          });
                        }}
                        renderInput={params => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </HStack>
                );
              })}
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              backgroundColor={'black'}
              color={'white'}
              variant={'solid'}
              mr={3}
              // onClick={() => buildFilter()}
            >
              Build
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
}

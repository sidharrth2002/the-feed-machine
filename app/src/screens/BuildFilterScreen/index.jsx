import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_FILTER } from '../../features/counter';
import { FaArrowLeft } from 'react-icons/fa';
import { Select } from 'chakra-react-select';
import { make_topic_name_presentable } from '../../utils';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function BuildFilterScreen() {
  const history = useHistory();
  const filters = useSelector(state => state.auth.filters);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstAttempt, setFirstAttempt] = useState(false);
  const toast = useToast();

  const buildFilter = () => {
    dispatch(
      ADD_FILTER({
        name: name.toLowerCase(),
        description,
        subtopics: topics.map(t => t.toLowerCase()),
        custom: topics.length > 0,
      })
    );
  };

  return (
    <Box>
      <Box
        minHeight={'100vh'}
        padding={4}
        width="100%"
        pt={8}
        pl={8}
        pr={8}
        alignItems={'space-between'}
      >
        <HStack mb={3}>
          <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} />
          <Heading fontSize={'1.8rem'} fontWeight={500}>
            Build Filter
          </Heading>
        </HStack>
        <Text>
          A filter can either be a single topic or a combination of topics. For
          instance, you can create called "Global Affairs" that includes
          "Politics" and "Climate".
        </Text>
        <VStack alignItems={'start'} spacing={5} mt={5}>
          <InputGroup flexDirection={'column'}>
            <Text mb={2}>Filter Name</Text>
            <Input
              variant="filled"
              placeholder="Give it an arbitrary name."
              onChange={e => setName(e.target.value)}
            />
            {firstAttempt && name.length === 0 && (
              <Text color={'red'}>Please enter a name.</Text>
            )}
            {firstAttempt &&
              name.length > 0 &&
              filters.filter(f => f.name === name).length > 0 && (
                <Text color={'red'}>This name is already taken.</Text>
              )}
          </InputGroup>
          <InputGroup flexDirection={'column'}>
            <Text mb={2}>Filter Description</Text>
            <Textarea
              variant="filled"
              placeholder="Write a short description."
              onChange={e => setDescription(e.target.value)}
            />
            {firstAttempt && description.length === 0 && (
              <Text color={'red'}>Please enter a description.</Text>
            )}
          </InputGroup>
        </VStack>
        <VStack alignItems={'start'} spacing={5} mt={5}>
          <InputGroup flexDirection={'column'}>
            <Text mb={2}>Choose sub-topic(s)</Text>
            <Select
              isMulti
              name="topics"
              options={[
                'news',
                'politics',
                'climate',
                'sports',
                'entertainment',
                'vehicles',
              ]
                // .filter(f => filters.map(f => f.name).includes(f) === false)
                .map(topic => {
                  return {
                    value: topic,
                    label: topic,
                  };
                })}
              placeholder="Search for a topic"
              variant="outline"
              useBasicStyles
              onChange={e => setTopics(e.map(t => t.value))}
            />
            {firstAttempt && topics.length === 0 && (
              <Text color={'red'}>Please select at least one topic.</Text>
            )}
          </InputGroup>
        </VStack>
      </Box>
      <Box
        position={'absolute'}
        bottom={0}
        width={'100%'}
        textAlign={'center'}
        backgroundColor={'black'}
        color={'white'}
        py={4}
        onClick={() => {
          if (
            name.length > 0 &&
            description.length > 0 &&
            topics.length > 0 &&
            filters.filter(f => f.name === name).length === 0
          ) {
            onOpen();
          } else {
            toast({
              title: 'Error',
              description: 'Please fill out all fields.',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
            setFirstAttempt(true);
          }
        }}
      >
        <Text>BUILD</Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>Are you sure you want to build this filter? </Text>
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
              onClick={() => {
                buildFilter();
                onClose();
                history.goBack();
              }}
            >
              Build
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

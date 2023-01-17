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
import {
  change_topic_name_to_id,
  make_topic_name_presentable,
} from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

import { FaArrowLeft } from 'react-icons/fa';
import { Select } from 'chakra-react-select';
import { UPDATE_FILTER } from '../../features/counter';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function EditFilterScreen(props) {
  const { match } = props;
  let filter = match.params.topic;
  const history = useHistory();
  const filters = useSelector(state => state.auth.filters);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstAttempt, setFirstAttempt] = useState(false);
  const toast = useToast();
  filter = filters.find(f => f.name === filter);
  const [name, setName] = useState(get(filter, 'name', ''));
  const [description, setDescription] = useState(
    get(filter, 'description', ' ')
  );
  const [topics, setTopics] = useState(get(filter, 'subtopics', [name]));

  const updateFilter = () => {
    dispatch(
      UPDATE_FILTER({
        id: get(filter, 'id', ''),
        name: change_topic_name_to_id(name),
        description,
        topics,
      })
    );
  };

  return (
    <Box>
      <Box
        minHeight={'100vh'}
        padding={4}
        width="100%"
        py={8}
        px={8}
        alignItems={'space-between'}
      >
        <HStack mb={3}>
          <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} />
          <Heading fontSize={'1.8rem'} fontWeight={500}>
            Edit {make_topic_name_presentable(get(filter, 'name', ''))}
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
              value={make_topic_name_presentable(name)}
              variant="filled"
              placeholder="Give it an arbitrary name."
              onChange={e => setName(e.target.value)}
            />
            {firstAttempt && name.length === 0 && (
              <Text color={'red'}>Please enter a name.</Text>
            )}
          </InputGroup>
          <InputGroup flexDirection={'column'}>
            <Text mb={2}>Filter Description</Text>
            <Textarea
              value={description}
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
              options={filters
                .filter(f => f.custom !== true)
                .map(topic => {
                  return {
                    value: topic.name,
                    label: make_topic_name_presentable(topic.name),
                  };
                })}
              value={topics.map(t => {
                return {
                  value: t,
                  label: make_topic_name_presentable(t),
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
          if (name.length > 0 && description.length > 0 && topics.length > 0) {
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
        <Text>SAVE</Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>
              Are you sure you want to save your changes? This action is
              irreversible.
            </Text>
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
                updateFilter();
                onClose();
                history.goBack();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

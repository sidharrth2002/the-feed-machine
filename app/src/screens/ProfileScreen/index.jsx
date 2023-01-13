import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { COLORS, screen_time, topic_distribution } from './screen_time';
import { FaArrowLeft, FaFilter, FaHome } from 'react-icons/fa';

import { BiGlobe } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  const user = useSelector(state => state.auth.user);
  const history = useHistory();

  return (
    <Box minHeight={'100vh'} width="100%">
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
        >
          <Icon as={FaFilter} boxSize={5} />
          <Text>Filtering</Text>
        </HStack>
        <HStack
          justifyContent={'center'}
          width={'33%'}
          py={4}
          borderBottom={'2px solid #0053d6'}
        >
          <Icon color={'#0053d6'} as={CgProfile} boxSize={7} />
          <Text color={'#0053d6'}>Profile</Text>
        </HStack>
      </HStack>
      <Box padding={4} width="100%" pt={6} pl={8} pr={8}>
        <HStack mb={3}>
          {/* <Icon as={FaArrowLeft} boxSize={6} onClick={() => history.goBack()} /> */}
          <Heading fontWeight={500}>Your Profile</Heading>
        </HStack>
        <VStack width="100%" justifyContent={'start'}>
          <Text width="100%" fontSize={20}>
            Hi {user.split(' ')[0]}!
          </Text>
          <Text>
            Check out your usage over the week and the topics you're filtering.
          </Text>
        </VStack>
        <Box shadow={'md'} p={4} mt={4} width="100%" borderRadius={8}>
          <Heading fontSize={20} fontWeight={500} mb={3}>
            Your Topics
          </Heading>
          <Flex flexWrap={'wrap'}>
            {['Politics', 'Sports', 'Entertainment', 'Technology'].map(
              (topic, index) => (
                <HStack
                  key={index}
                  minWidth="100px"
                  py={2}
                  px={2}
                  backgroundColor="#001C55"
                  borderRadius={20}
                  spacing={1}
                  mr={2}
                  mb={2}
                >
                  <Icon as={BiGlobe} boxSize={6} color="white" />
                  <Text color="white">{topic}</Text>
                </HStack>
              )
            )}
          </Flex>
        </Box>
        <Box width="100%" mt={4}>
          <Heading fontSize={20} fontWeight={500} mb={3}>
            Topic Distribution
          </Heading>
          <Text mb={0}>
            What kind of topics appeared on your feed this week?
          </Text>
          <Text mb={3} fontSize={12}>
            Posts about{' '}
            {
              topic_distribution.filter(
                topic =>
                  topic.value ===
                  Math.max(...topic_distribution.map(topic => topic.value))
              )[0].name
            }{' '}
            were the most common.
          </Text>
          {/* //topic distribution pie chart using Recharts */}
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={topic_distribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#EC6B56"
              label
            >
              {topic_distribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              labelFormatter={label => `${label}`}
              formatter={value => `${value} posts`}
            />
            <Legend />
          </PieChart>
        </Box>
        <Box width="100%" mt={4}>
          <Heading fontSize={20} fontWeight={500} mb={3}>
            Screen Time
          </Heading>
          <Text mb={3}>
            How much time did you spend on the platform each day this week?
          </Text>
          {/* //screen time chart using Recharts */}
          <BarChart
            width={300}
            height={300}
            data={screen_time}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="2 2" />
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" strokeDasharray={'2 2'} />
            <Tooltip
              labelFormatter={label => `${label}`}
              formatter={value =>
                `${value} hour${value === 1 ? '' : 's'} ${
                  value === 0 ? '🎉' : ''
                }`
              }
            />
            <Bar
              dataKey="Screen Time"
              fill="#8884d8"
              barSize={10}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SecondSplash, SplashLogo } from '../../assets';

import NiceButton from '../../components/Button';
import { useHistory } from 'react-router-dom';

export default function SplashScreen() {
  const [step, setStep] = useState(0);
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8EFEF',
      }}
    >
      {step === 0 && (
        <Flex
          padding={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Image src={SplashLogo} alt={'logo'} width={200} />
          <Heading
            sx={{
              fontSize: '2.5rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              lineHeight: '53px',
              textAlign: 'center',
            }}
            mt={5}
            mb={4}
          >
            The Feed Machine
          </Heading>
          <Box mb={3}>
            <Text lineHeight={'25px'} textAlign="center" fontSize={'1.2rem'}>
              See only what you want to see when you want to see it.{' '}
            </Text>
          </Box>
          <NiceButton
            text={'Get Started'}
            onClick={() => setStep(1)}
            nextArrow
          />
        </Flex>
      )}
      {step === 1 && (
        <Flex
          padding={'3rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Image src={SecondSplash} alt={'logo'} width={370} mb={-5} />
          <Text lineHeight={'25px'}>
            Choose which types of posts you want to see at each time of the day
            and voila, your feed has been re-engineered through the power of
            natural language processing.
          </Text>
          <NiceButton text={'Next'} onClick={() => setStep(2)} nextArrow />
        </Flex>
      )}
      {step === 2 && (
        <Flex
          padding={'3rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Text lineHeight={'25px'} textAlign={'center'} mb={4}>
            The Feed Machine runs on top of your favourite social media apps.
            This prototype is a layer on top of Facebook.
          </Text>
          <Text lineHeight={'25px'} textAlign={'center'}>
            Made with ❤️ by Sidharrth, Erfan and Isak in Torino, 2023.
          </Text>
          <NiceButton
            text={'Go To App'}
            onClick={() => {
              history.push('/home');
            }}
            nextArrow
          />
        </Flex>
      )}
    </Box>
  );
}

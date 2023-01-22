import { Avatar, Box, HStack, Icon, Image, useToast } from '@chakra-ui/react';

import { FaPlus } from 'react-icons/fa';
import React from 'react';
import assets from '../../assets';

export default function StoriesSlider() {
  const toast = useToast();

  return (
    <HStack minHeight={150} padding={3} overflowX={'scroll'}>
      {['autumn', 'landscape', 'party', 'biden'].map((asset, index) => (
        <Box
          borderRadius={20}
          minWidth={100}
          height={140}
          boxShadow="md"
          overflow={'hidden'}
          position={'relative'}
          onClick={() => {
            toast({
              title: 'Story',
              description: 'Not implemented yet',
              status: 'info',
              duration: 9000,
              isClosable: true,
            });
          }}
        >
          <Image
            src={assets[asset]}
            width={100}
            height={'100%'}
            objectFit="cover"
            zIndex={-1}
          />
          {index === 0 && (
            <Icon
              as={FaPlus}
              boxSize={6}
              position={'absolute'}
              // position in the center
              top={'80%'}
              left={'50%'}
              transform={'translate(-50%, -50%)'}
              zIndex={1000}
              color={'white'}
            />
          )}
          {index > 0 && (
            <Icon
              as={Avatar}
              boxSize={6}
              position={'absolute'}
              top={2}
              left={2}
              zIndex={1000}
              color={'white'}
            />
          )}
        </Box>
      ))}
    </HStack>
  );
}

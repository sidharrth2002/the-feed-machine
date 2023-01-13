import { Button, Icon } from '@chakra-ui/react';

import { FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { get } from 'lodash';

export default function NiceButton(props) {
  const { text, nextArrow, onClick } = props;
  return (
    <Button
      borderRadius="20px"
      backgroundColor={'#19191B'}
      textColor="white"
      fontWeight={200}
      mt={get(props, 'mt', 5)}
      onClick={onClick}
    >
      {text}
      {nextArrow && <Icon as={FaArrowRight} ml={2} />}
    </Button>
  );
}

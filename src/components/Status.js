import React from 'react';
import {Center} from 'native-base';

const Status = ({status}) => {
  if (status === 1) {
    return (
      <Center
        bg="yellow.500"
        _dark={{
          bg: 'yellow.400',
        }}
        _text={{
          color: 'warmGray.50',
          fontWeight: '700',
          fontSize: 'xs',
        }}
        px="3"
        py="1.5">
        Ditinjau
      </Center>
    );
  } else if (status === 2) {
    return (
      <Center
        bg="violet.500"
        _dark={{
          bg: 'violet.400',
        }}
        _text={{
          color: 'warmGray.50',
          fontWeight: '700',
          fontSize: 'xs',
        }}
        px="3"
        py="1.5">
        Diprosess
      </Center>
    );
  } else {
    return (
      <Center
        bg="green.500"
        _dark={{
          bg: 'green.400',
        }}
        _text={{
          color: 'warmGray.50',
          fontWeight: '700',
          fontSize: 'xs',
        }}
        px="3"
        py="1.5">
        Selesai
      </Center>
    );
  }
};

export default Status;

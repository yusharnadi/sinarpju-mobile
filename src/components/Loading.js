import React from 'react';
import {HStack, Spinner, Heading} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center" m="5">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="blue.900" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loading;

import React from 'react';
import {AspectRatio, Box, Button, Heading, Icon, Text} from 'native-base';
import ErrorIcon from '../assets/error.svg';
import {HomeIcon} from 'react-native-heroicons/outline';
export default function Error({handleError, error, title}) {
  // console.log(handleSuccess);
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      p="5"
      background="white">
      <Heading size="sm" my="4" color="red.900">
        {title} !!!
      </Heading>
      <Box w="100%" maxW="300px">
        <AspectRatio ratio="16/9">
          <ErrorIcon />
        </AspectRatio>
      </Box>
      <Text my="2" color="red.900">
        {error.message}
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        mx="4"
        my="6"
        w="100%"
        leftIcon={<Icon as={HomeIcon} size="md" />}
        onPress={() => handleError()}>
        Kembali
      </Button>
    </Box>
  );
}

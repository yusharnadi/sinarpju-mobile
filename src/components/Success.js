import React from 'react';
import {AspectRatio, Box, Button, Heading, Icon} from 'native-base';
import SuccessIcon from '../assets/success.svg';
import {HomeIcon} from 'react-native-heroicons/outline';
export default function Success({handleSuccess, title}) {
  // console.log(handleSuccess);
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      p="5"
      background="white">
      <Heading size="sm" my="4">
        {title}
      </Heading>
      <Box w="100%" maxW="300px">
        <AspectRatio ratio="16/9">
          <SuccessIcon />
        </AspectRatio>
      </Box>
      <Button
        colorScheme="blue"
        size="lg"
        mx="4"
        my="6"
        w="100%"
        leftIcon={<Icon as={HomeIcon} size="md" />}
        onPress={() => handleSuccess()}>
        Beranda
      </Button>
    </Box>
  );
}

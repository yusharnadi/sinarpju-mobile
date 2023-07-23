import {Text} from 'react-native';
import React from 'react';
import {Box} from 'native-base';

const GeneralError = () => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Text>Gagal meload data dari server .</Text>;
    </Box>
  );
};

export default GeneralError;

import React from 'react';
import {Avatar, Box, Text} from 'native-base';

const Petugas = ({petugas}) => {
  const nick = petugas.namaPetugas
    .toUpperCase()
    .split(' ')
    .map(str => str[0])
    .join('');

  return (
    <Box flex={1} mb="2" flexDirection="row" alignItems="center">
      <Avatar bg="blue.800" mr="1">
        {nick}
      </Avatar>
      <Text bold>{petugas.namaPetugas}</Text>
    </Box>
  );
};

export default Petugas;

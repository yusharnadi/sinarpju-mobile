import React from 'react';
import {Box, HStack} from 'native-base';
import Logo from '../assets/logo.svg';
import {Image} from 'react-native';

const TopBar = () => {
  return (
    <Box bgColor="blue.900" px="5" py="2.5">
      <HStack justifyContent="space-between" alignItems="center">
        {/* <Logo /> */}
        <Image
          source={require('../assets/logo-head.png')}
          style={{height: 35, width: 111}}
        />
        {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Flex direction="row" align="center">
            <Text bold fontSize="xs" color="light.50" mr="2">
              Masuk
            </Text>
            <Icon as={BellIcon} color="muted.50" size="12" />
          </Flex>
        </TouchableOpacity> */}
      </HStack>
    </Box>
  );
};

export default TopBar;

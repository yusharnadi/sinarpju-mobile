import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, HStack, Flex, Text, Icon} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo.svg';
import {useNavigation} from '@react-navigation/native';

const TopBar = () => {
  const navigation = useNavigation();
  return (
    <Box bgColor="blue.900" px="5" py="2.5">
      <HStack justifyContent="space-between" alignItems="center">
        <Logo />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Flex direction="row" align="center">
            <Text bold fontSize="xs" color="light.50" mr="2">
              Masuk
            </Text>
            <Icon
              as={FontAwesomeIcon}
              icon={faSignInAlt}
              color="muted.50"
              size="12"
            />
          </Flex>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default TopBar;

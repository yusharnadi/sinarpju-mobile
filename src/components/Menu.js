import {TouchableOpacity} from 'react-native';
import React from 'react';
import {
  MegaphoneIcon,
  NewspaperIcon,
  InboxArrowDownIcon,
  CalendarDaysIcon,
} from 'react-native-heroicons/outline';
import {Box, Center, Flex, Icon, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  return (
    <Box
      bg="white"
      w="full"
      my="2"
      p="5"
      d="flex"
      flexDirection="row"
      justifyContent="space-between">
      <TouchableOpacity onPress={() => navigation.navigate('Lapor')}>
        <Center>
          <Flex
            w="16"
            h="16"
            bg="blue.900"
            borderRadius="full"
            justify="center"
            align="center">
            <Icon as={MegaphoneIcon} color="muted.50" />
          </Flex>
          <Text mt="2" fontSize="xs">
            Lapor
          </Text>
        </Center>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Berita')}>
        <Center>
          <Flex
            w="16"
            h="16"
            bg="blue.900"
            borderRadius="full"
            justify="center"
            align="center">
            <Icon
              as={NewspaperIcon}
              name="NewspaperIcon"
              color="muted.50"
              size="6"
            />
          </Flex>
          <Text mt="2" fontSize="xs">
            Berita
          </Text>
        </Center>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Saran')}>
        <Center>
          <Flex
            w="16"
            h="16"
            bg="blue.900"
            borderRadius="full"
            justify="center"
            align="center">
            <Icon
              as={InboxArrowDownIcon}
              name="InboxArrowDownIcon"
              color="muted.50"
            />
          </Flex>
          <Text mt="2" w="16" textAlign="center" fontSize="xs" lineHeight="xs">
            Masukan & Saran
          </Text>
        </Center>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Agenda')}>
        <Center>
          <Flex
            w="16"
            h="16"
            bg="blue.900"
            borderRadius="full"
            justify="center"
            align="center">
            <Icon
              as={CalendarDaysIcon}
              name="CalendarDaysIcon"
              color="muted.50"
            />
          </Flex>
          <Text mt="2" w="16" textAlign="center" fontSize="xs" lineHeight="xs">
            Agenda
          </Text>
        </Center>
      </TouchableOpacity>
    </Box>
  );
};

export default Menu;

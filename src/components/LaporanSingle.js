/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Box,
  HStack,
  Text,
  AspectRatio,
  Stack,
  Heading,
  Center,
  Icon,
} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {ClockIcon} from 'react-native-heroicons/solid';

export default function LaporanSingle({laporan}) {
  const date = moment(laporan.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format(
    'DD-MM-YYYY HH:mm',
  );
  const navigation = useNavigation();
  const Status = () => {
    if (laporan.status === 1) {
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
          position="absolute"
          bottom="0"
          px="3"
          py="1.5">
          Ditinjau
        </Center>
      );
    } else if (laporan.status === 2) {
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
          position="absolute"
          bottom="0"
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
          position="absolute"
          bottom="0"
          px="3"
          py="1.5">
          Selesai
        </Center>
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('LaporanDetail', {id: laporan.id})}>
      <Box alignItems="center" m="2">
        <Box
          // maxW="72"
          w="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: laporan.gambar,
                }}
                alt="image"
              />
            </AspectRatio>
            <Status />
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {laporan.namaPelapor}
              </Heading>
            </Stack>
            <Text fontWeight="400" numberOfLines={2}>
              {laporan.keterangan}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Icon as={ClockIcon} size="sm" />
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="300"
                  fontSize="xs"
                  fontStyle="italic">
                  {date}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

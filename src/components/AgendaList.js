import {Image} from 'react-native';
import React from 'react';
import {Box, HStack, Text, AspectRatio, Stack, Heading} from 'native-base';
import moment from 'moment';

const AgendaList = ({agenda}) => {
  const date = moment(agenda.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format(
    'DD-MM-YYYY HH:mm',
  );

  return (
    <Box alignItems="center" m="2" key={agenda.id}>
      <Box
        maxW="80"
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
                uri: agenda.foto,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="xs" ml="-1" numberOfLines={2}>
              {agenda.judul}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {agenda.deskripsi}
              </Text>
            </HStack>
          </HStack>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontSize="xs">
            {date}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default AgendaList;

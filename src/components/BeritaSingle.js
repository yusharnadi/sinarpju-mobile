import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {Box, HStack, Text, AspectRatio, Stack, Heading} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function BeritaSingle({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BeritaDetail', {id: item.id})}>
      <Box alignItems="center" m="2" key={item.id}>
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
                  uri: item.better_featured_image.source_url,
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="xs" ml="-1" numberOfLines={2}>
                {item.title.rendered}
              </Heading>
            </Stack>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400">
                  Media Center Singkawang
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

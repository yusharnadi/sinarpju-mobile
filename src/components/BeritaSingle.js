import React from 'react';
import { Image } from 'react-native';

import { Box, HStack, Text, AspectRatio, Stack, Heading, Spinner } from 'native-base';

export default function BeritaSingle({ item }) {
    return (
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
                }}
            >
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
                    {/* <Text fontWeight="400">
                            Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.
                        </Text> */}
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200',
                                }}
                                fontWeight="400"
                            >
                                Media Center Singkawang
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    );
}

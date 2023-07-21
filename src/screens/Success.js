import { View, Text } from 'react-native';
import React from 'react';
import { AspectRatio, Box, Button, Heading, Icon } from 'native-base';
import SuccessIcon from '../assets/success.svg';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Success({ handleSuccess }) {
    // console.log(handleSuccess);
    return (
        <Box flex={1} alignItems="center" justifyContent="center" p="5" background="white">
            <Heading size="sm" my="4">
                Berhasil Membuat laporan
            </Heading>
            <Box w="100%" maxW="300px">
                <AspectRatio ratio="16/9">
                    <SuccessIcon />
                </AspectRatio>
            </Box>
            <Button colorScheme="blue" size="lg" mx="4" my="6" w="100%" leftIcon={<Icon as={Ionicons} name="home" size="md" />} onPress={() => handleSuccess()}>
                Beranda
            </Button>
        </Box>
    );
}

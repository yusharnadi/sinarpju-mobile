import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Center,
  VStack,
  FormControl,
  Input,
  Text,
  Button,
  HStack,
  Box,
  Icon,
} from 'native-base';
import {XMarkIcon} from 'react-native-heroicons/solid';

export default function Login({navigation}) {
  const [formData, setData] = React.useState({});
  return (
    <Box flex={1} safeArea>
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <Icon as={XMarkIcon} color="muted.900" size="7" m="5" />
      </TouchableOpacity>
      <Center flex={1}>
        <VStack width="90%" mx="3" maxW="300px">
          <Text fontSize="4xl" bold mb="10">
            Login Untuk Memulai
          </Text>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Email
            </FormControl.Label>
            <Input
              placeholder="email@sinarpju.id"
              onChangeText={value => setData({...formData, name: value})}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Password
            </FormControl.Label>
            <Input
              placeholder="xxx"
              onChangeText={value => setData({...formData, name: value})}
            />
            <TouchableOpacity>
              <Text bold textAlign="right" mt="1">
                Lupa Password?{' '}
              </Text>
            </TouchableOpacity>
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>
          <Button onPress={() => {}} my="5" colorScheme="blue">
            Submit
          </Button>
          <TouchableOpacity>
            <Center>
              <HStack>
                <Text>Belum Punya Akun ? </Text>
                <Text bold>Daftar Disini. </Text>
              </HStack>
            </Center>
          </TouchableOpacity>
        </VStack>
      </Center>
    </Box>
  );
}

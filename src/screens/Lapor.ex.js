import React from 'react';
import {
  Box,
  FormControl,
  Stack,
  TextArea,
  Center,
  Text,
  Button,
  StatusBar,
  AspectRatio,
  Icon,
  Input,
  ScrollView,
  Heading,
  HStack,
  Spinner,
} from 'native-base';
import {Image} from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Success from '../components/Success';
// import 'yup-phone-lite';

export default function LaporEx({navigation}) {
  const [image, setImage] = React.useState(null);

  const [location, setLocation] = React.useState(null);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [isLoading, setIsloading] = React.useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const submit = async values => {
    setIsloading(true);
    const data = new FormData();

    let filename = image.uri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    data.append('gambar', {
      type: type,
      name: filename,
      uri: image.uri,
    });

    data.append('keterangan', values.keterangan);
    data.append('alamat', values.alamat);
    data.append('namaPelapor', values.namaPelapor);
    data.append('noHp', values.noHp);
    data.append('status', 1);
    data.append('latitude', location?.coords?.latitude);
    data.append('longitude', location?.coords?.longitude);

    try {
      const response = await axios.post(
        'https://sinarpju.digitaldev.id/api/laporan/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setIsSuccess(true);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);

      if (error.response) {
        // Update UI accordingly
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        alert(
          'Server mengalami gangguan network. Mohon coba beberapa saat lagi.',
        );
      } else {
        console.log(`Error message: ${error.message}`);
      }
    }
  };

  const getLocation = async () => {
    console.log('Try to request location');
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  const handleSuccess = () => {
    console.log('oke');
    setIsSuccess(false);
    navigation.popToTop();
  };

  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center" mt="20">
        <Spinner accessibilityLabel="Sending Data . . ." />
        <Heading color="blue.900" fontSize="md">
          Sending . . .
        </Heading>
      </HStack>
    );
  }

  if (isSuccess) {
    return <Success handleSuccess={handleSuccess} />;
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidationSchema = yup.object().shape({
    namaPelapor: yup.string().min(2).required('Nama Pelapor wajib diisi.'),
    keterangan: yup.string().required('Keterangan Gangguan wajib diisi.'),
    alamat: yup.string().required('Nama Jalan wajib diisi.'),
    noHp: yup.string().matches(phoneRegExp, 'Nomor HP tidak Valid'),
  });

  return (
    <ScrollView>
      <Box alignItems="center" flex={1}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" /> */}
        <AspectRatio w="100%" ratio={16 / 9} backgroundColor={'gray.300'}>
          <Image source={{uri: image?.uri}}></Image>
        </AspectRatio>
        <Button
          size="lg"
          my="4"
          w="80%"
          leftIcon={<Icon as={Ionicons} name="camera-outline" size="lg" />}
          onPress={pickImage}>
          Pilih Gambar
        </Button>

        <Center background="white" w="full" px="5" flex="1">
          <Box w="100%" maxWidth="300px">
            <Formik
              validationSchema={ValidationSchema}
              initialValues={{
                namaPelapor: '',
                noHp: '',
                keterangan: '',
                alamat: '',
              }}
              onSubmit={values => {
                submit(values);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <FormControl isRequired isInvalid={'keterangan' in errors}>
                    <Stack m="4">
                      <FormControl.Label>Keterangan</FormControl.Label>
                      <TextArea
                        h={20}
                        maxW="300"
                        onBlur={handleBlur('keterangan')}
                        value={values.keterangan}
                        onChangeText={handleChange('keterangan')}
                      />
                      <FormControl.HelperText>
                        Masukan keterangan gangguan.
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage>
                        {errors.keterangan}
                      </FormControl.ErrorMessage>
                    </Stack>
                  </FormControl>
                  <FormControl isRequired isInvalid={'alamat' in errors}>
                    <Stack m="4">
                      <FormControl.Label>Nama Jalan</FormControl.Label>
                      <TextArea
                        h={20}
                        maxW="300"
                        onBlur={handleBlur('alamat')}
                        value={values.alamat}
                        onChangeText={handleChange('alamat')}
                      />
                      <FormControl.HelperText>
                        Masukan nama jalan lokasi gangguan.
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage>
                        {errors.alamat}
                      </FormControl.ErrorMessage>
                    </Stack>
                  </FormControl>
                  <FormControl isRequired isInvalid={'namaPelapor' in errors}>
                    <Stack mx="4">
                      <FormControl.Label>Nama Pelapor</FormControl.Label>
                      <Input
                        maxW="300"
                        onBlur={handleBlur('namaPelapor')}
                        value={values.namaPelapor}
                        onChangeText={handleChange('namaPelapor')}
                      />
                      <FormControl.ErrorMessage>
                        {errors.namaPelapor}
                      </FormControl.ErrorMessage>
                    </Stack>
                  </FormControl>
                  <FormControl isRequired isInvalid={'noHp' in errors}>
                    <Stack mx="4">
                      <FormControl.Label>No Handphone</FormControl.Label>
                      <Input
                        maxW="300"
                        onBlur={handleBlur('noHp')}
                        value={values.noHp}
                        onChangeText={handleChange('noHp')}
                      />
                      <FormControl.ErrorMessage>
                        {errors.noHp}
                      </FormControl.ErrorMessage>
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Text fontSize="xs" m="4">
                      Koordinat : {location?.coords?.latitude ?? 0} ,{' '}
                      {location?.coords?.longitude}
                    </Text>
                  </FormControl>
                  <Button
                    size="lg"
                    m="4"
                    // w="100%"
                    rightIcon={<Icon as={Ionicons} name="send" size="md" />}
                    onPress={handleSubmit}
                    // isLoading={isLoading || !image}
                    isLoading={!isValid || !location || !image}>
                    Buat Laporan
                  </Button>
                </>
              )}
            </Formik>
          </Box>
        </Center>
      </Box>
    </ScrollView>
  );
}

import {
  Text,
  ScrollView,
  Image,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import React from 'react';
import {
  Box,
  AspectRatio,
  Button,
  Icon,
  Center,
  FormControl,
  Stack,
  TextArea,
  Input,
  HStack,
  Spinner,
  Heading,
} from 'native-base';
import {CameraIcon, PaperAirplaneIcon} from 'react-native-heroicons/outline';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import Geolocation from 'react-native-geolocation-service';
import {launchImageLibrary} from 'react-native-image-picker';
import Success from '../components/Success';
import Error from '../components/Error';
import {useSWRConfig} from 'swr';
import {laporanUrlEndpoint} from '../apis/LaporanApi';
import {Host} from '../utils/Host';

const Lapor = ({navigation}) => {
  const [image, setImage] = React.useState(null);

  const [location, setLocation] = React.useState(null);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const {mutate} = useSWRConfig();

  React.useEffect(() => {
    getLocation();
  }, []);

  const pickImage = async () => {
    console.log('Open Image Picker');
    let picker_option = {
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 900,
      maxWidth: 1600,
    };

    const result = await launchImageLibrary(picker_option, setImage);
    // console.log(image);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else if (result.customButton) {
      console.log('User tapped custom button: ', result.customButton);
    } else {
      setImage(result.assets[0]);
      console.log('result Image Picker', JSON.stringify(result));
    }
  };

  const submit = async values => {
    console.log('Submit Handler');
    setIsLoading(true);

    const data = new FormData();
    data.append('gambar', {
      type: image.type,
      name: image.fileName,
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
      const response = await axios.post(`${Host}laporan`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: 'tokenku123987347@1234',
        },
      });

      mutate(laporanUrlEndpoint);
      setIsSuccess(true);
      setIsLoading(false);
      console.log(response.data);
      return;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        setIsError({
          status: true,
          type: 'Error Response Validation Error',
          message: error.response.data?.message,
        });
        setIsLoading(false);
        return;
      } else if (error.request) {
        console.log(error.request);
        setIsError({
          status: true,
          type: 'Error Request / Bad Request.',
          message: error.request,
        });
        setIsLoading(false);
        return;
      } else {
        console.log(`Unknown Error message: ${error.message}`);
        setIsError({
          status: true,
          type: 'Unknown Error .',
          message: error.message,
        });
      }
    }
    console.log('Unknown Error message');
    setIsError({
      status: true,
      type: 'Unknown Error .',
      message: 'Network Error or Server down.',
    });
    setIsLoading(false);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permohonan Ijin Lokasi',
          message: 'Aplikasi memohon ijin akses lokasi ?',
          buttonNeutral: 'Tanya nanti',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );

      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('GRANTED => You can use Geolocation');
        return true;
      } else {
        console.log('DENY => You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();

    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const handleSuccess = () => {
    console.log('Success UI Rendered');

    setIsSuccess(false);
    navigation.popToTop();
  };

  if (isSuccess) {
    return (
      <Success
        handleSuccess={handleSuccess}
        title="Berhasil membuat laporan."
      />
    );
  }

  const handleError = () => {
    console.log('Error UI Rendered');
    setIsError(false);
    // navigation.popToTop();
  };

  if (isError) {
    return (
      <Error
        handleError={handleError}
        error={isError}
        title="Gagal membuat laporan."
      />
    );
  }

  //   VALIDATION SCHEMA YUP
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidationSchema = yup.object().shape({
    namaPelapor: yup.string().min(2).required('Nama Pelapor wajib diisi.'),
    keterangan: yup.string().required('Keterangan Gangguan wajib diisi.'),
    alamat: yup.string().required('Nama Jalan wajib diisi.'),
    noHp: yup
      .string()
      .matches(phoneRegExp, 'Nomor HP tidak Valid')
      .min(9, 'Minimal 9 Angka'),
  });

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

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <Box alignItems="center" flex={1}>
        <AspectRatio w="100%" ratio={16 / 9} backgroundColor={'gray.300'}>
          <Image
            source={{
              uri: image?.uri
                ? image?.uri
                : 'https://placehold.co/600x400/cccccc/fff.png?text=Gambar+laporan',
            }}
          />
        </AspectRatio>
        <Button
          size="lg"
          my="4"
          w="80%"
          leftIcon={<Icon as={CameraIcon} name="camera-outline" size="lg" />}
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
                        inputMode="tel"
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
                    background="blue.900"
                    size="lg"
                    m="4"
                    rightIcon={
                      <Icon as={PaperAirplaneIcon} name="send" size="md" />
                    }
                    onPress={handleSubmit}
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
};

export default Lapor;

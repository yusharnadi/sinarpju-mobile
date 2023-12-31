/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import {SafeAreaView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  AspectRatio,
  ScrollView,
  Text,
  Box,
  Button,
  Icon,
  Modal,
  FormControl,
  Input,
  Stack,
} from 'native-base';
import axios from 'axios';
import {Host} from '../utils/Host';
import GeneralError from '../components/GeneralError';
import Loading from '../components/Loading';
import {TrashIcon} from 'react-native-heroicons/outline';
import Mapbox from '@rnmapbox/maps';
import {Formik} from 'formik';
import * as yup from 'yup';
import Success from '../components/Success';
import Error from '../components/Error';
import Status from '../components/Status';
import Petugas from '../components/Petugas';
import moment from 'moment/moment';
import {useSWRConfig} from 'swr';
import {laporanUrlEndpoint} from '../apis/LaporanApi';

const LaporanDetail = ({route, navigation}) => {
  const {id} = route.params;
  const [data, setData] = React.useState(null);
  const [petugas, setPetugas] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const {mutate} = useSWRConfig();

  Mapbox.setAccessToken(
    'pk.eyJ1IjoieXVzaGFybmFkaSIsImEiOiJjbGp3YzVpeWgwb2FiM2luMXQwNjkzMW0yIn0.3CXh3GgHOJCbUhZgEyrAYA',
  );

  const getData = () => {
    axios
      .get(`${Host}laporan/${id}`)
      .then(function (response) {
        setData(response.data.data);
        setPetugas(response.data.petugas);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      })
      .finally(function () {
        // always executed
        console.log('Done Fetching Laporan Laporan Detail');
        setIsLoading(false);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <GeneralError />;
  }

  if (isLoading) {
    return <Loading />;
  }

  //   VALIDATION SCHEMA YUP
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidationSchema = yup.object().shape({
    noHp: yup
      .string()
      .matches(phoneRegExp, 'Nomor HP tidak valid')
      .min(9, 'Minimal 9 Angka')
      .required('Tidak boleh kosong'),
  });

  const submit = async values => {
    setShowModal(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${Host}laporan/${id}`, values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      mutate(laporanUrlEndpoint);
      setIsSuccess(true);
      setIsLoading(false);
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
  };

  const handleSuccess = () => {
    console.log('Success UI Rendered');

    setIsSuccess(false);
    navigation.navigate('Home');
  };

  if (isSuccess) {
    return (
      <Success
        handleSuccess={handleSuccess}
        title="Berhasil menghapus laporan."
      />
    );
  }

  const handleError = () => {
    console.log('Error UI Rendered');
    setIsError(false);
  };

  if (isError) {
    return (
      <Error
        handleError={handleError}
        error={isError}
        title="Gagal menghapus laporan."
      />
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Box flex="1" backgroundColor="muted.50">
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: data
                  ? data.gambar
                  : 'https://placehold.co/600x400/cccccc/fff.png?text=Gambar+laporan',
              }}
            />
          </AspectRatio>
          <Text px="5" py={2} bold>
            Nama Pelapor
          </Text>
          <Box p="5" backgroundColor="white">
            <Text numberOfLines={1}>{data.namaPelapor}</Text>
          </Box>

          {/* <Text px="5" py={2} bold>
            Nomor Handphone
          </Text>
          <Box p="5" backgroundColor="white">
            <Text numberOfLines={1}>{data.noHp}</Text>
          </Box> */}

          <Text px="5" py={2} bold>
            Keterangan
          </Text>
          <Box p="5" backgroundColor="white">
            <Text>{data.keterangan}</Text>
          </Box>

          <Text px="5" py={2} bold>
            Nama Jalan
          </Text>
          <Box p="5" backgroundColor="white">
            <Text numberOfLines={2}>{data.alamat}</Text>
          </Box>

          <Text px="5" py={2} bold>
            Koordinat
          </Text>
          <Box backgroundColor="white">
            <Mapbox.MapView
              style={styles.map}
              styleURL={Mapbox.StyleURL.Street}>
              <Mapbox.Camera
                zoomLevel={13}
                centerCoordinate={[data.longitude, data.latitude]}
                animationMode="flyTo"
                animationDuration={2000}
              />
              <Mapbox.PointAnnotation
                id="1"
                title={'this is a marker view'}
                coordinate={[data.longitude, data.latitude]}
              />
            </Mapbox.MapView>
          </Box>
          <Box p="5" backgroundColor="white">
            <Text>
              Waktu Dilaporakan :{' '}
              {moment(data.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format(
                'DD-MM-YYYY HH:mm',
              )}
            </Text>
          </Box>

          <Text px="5" py={2} bold>
            Status Laporan
          </Text>
          <Box p="5" backgroundColor="white">
            {data && <Status status={data.status} />}
          </Box>
          {data.status === 3 && (
            <Box p="5" backgroundColor="white">
              <Text>
                Waktu Diselesaikan :{' '}
                {moment(data.updated_at, 'YYYY-MM-DDTHH:mm:ssZ').format(
                  'DD-MM-YYYY HH:mm',
                )}
              </Text>
            </Box>
          )}
          {petugas.length > 0 && (
            <Text px="5" py={2} bold>
              Petugas Lapangan
            </Text>
          )}
          <Box p="5" backgroundColor="white">
            {petugas &&
              petugas.map(p => {
                return <Petugas key={p.idPetugas} petugas={p} />;
              })}
          </Box>
          <Box p="5" mb={'5'}>
            <Button
              onPress={() => setShowModal(true)}
              size="lg"
              backgroundColor="blue.900"
              rounded="lg"
              leftIcon={<Icon as={TrashIcon} size="sm" />}>
              Hapus
            </Button>
          </Box>
        </Box>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Hapus Laporan</Modal.Header>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{
              noHp: '',
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
                <Modal.Body>
                  <Text>
                    Mohon masukan nomor handphone di laporan yang akan dihapus.
                  </Text>
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
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={!isValid}
                      onPress={handleSubmit}
                      colorScheme="red">
                      Hapus
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default LaporanDetail;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 200,
  },
});

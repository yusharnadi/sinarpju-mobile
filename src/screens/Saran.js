/* eslint-disable no-alert */

import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button,
  FormControl,
  Icon,
  Stack,
  TextArea,
  Input,
  Box,
} from 'native-base';
import {PaperAirplaneIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import {Host} from '../utils/Host';

//   VALIDATION SCHEMA YUP
const ValidationSchema = yup.object().shape({
  nama: yup.string().min(2).required('Nama wajib diisi.'),
  saran: yup.string().required('Masukan dan Saran wajib diisi.'),
});

const Saran = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return <Loading />;
  }

  function submit(values) {
    setIsLoading(true);
    console.log(values);

    axios
      .post(`${Host}saran`, values)
      .then(result => {
        console.log(result.data);
        alert('Berhasil mengirim Masukan dan Saran');
      })
      .catch(() => {
        alert('Gagal mengirim Masukan dan Saran, Coba lagi beberapa saat.');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Box background="white" w="full" px="5" flex="1" alignItems="center">
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          nama: '',
          saran: '',
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
            <FormControl isRequired isInvalid={'saran' in errors}>
              <Stack m="4">
                <FormControl.Label>Masukan dan Saran</FormControl.Label>
                <TextArea
                  h={20}
                  onBlur={handleBlur('saran')}
                  value={values.saran}
                  onChangeText={handleChange('saran')}
                />
                <FormControl.HelperText>
                  Masukan keterangan gangguan.
                </FormControl.HelperText>
                <FormControl.ErrorMessage>
                  {errors.saran}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>

            <FormControl isRequired isInvalid={'nama' in errors}>
              <Stack mx="4">
                <FormControl.Label>Nama</FormControl.Label>
                <Input
                  onBlur={handleBlur('nama')}
                  value={values.nama}
                  onChangeText={handleChange('nama')}
                />
                <FormControl.ErrorMessage>
                  {errors.nama}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            <Button
              background="blue.900"
              size="lg"
              m="6"
              rightIcon={<Icon as={PaperAirplaneIcon} name="send" size="md" />}
              onPress={handleSubmit}
              isLoading={!isValid}>
              Kirim Masukan & Saran
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default Saran;

import {View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button,
  Center,
  FormControl,
  Icon,
  Stack,
  TextArea,
  Input,
  Box,
} from 'native-base';
import {PaperAirplaneIcon} from 'react-native-heroicons/outline';

//   VALIDATION SCHEMA YUP
const ValidationSchema = yup.object().shape({
  nama: yup.string().min(2).required('Nama wajib diisi.'),
  saran: yup.string().required('Masukan dan Saran wajib diisi.'),
});
const Saran = () => {
  function submit(values) {
    console.log(values);
  }
  return (
    // <Center background="white" w="full" px="5" flex="1">
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
                  {errors.keterangan}
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

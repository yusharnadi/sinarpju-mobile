import {SafeAreaView, Image} from 'react-native';
import React from 'react';
import {AspectRatio, ScrollView, Text, Box} from 'native-base';
import axios from 'axios';
import {Host} from '../utils/Host';
import GeneralError from '../components/GeneralError';
import Loading from '../components/Loading';

const LaporanDetail = ({route, navigation}) => {
  //   const {id} = route.params;
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const getData = async () => {
    try {
      let res = await axios.get(`${Host}laporan`);
      console.log(res.data.data[6]);
      setData(res.data.data[6]);
      setIsLoading(false);
    } catch (err) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        console.log(err.response.data.message);
        setError(true);
        setIsLoading(false);
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log(err.request);
        setIsLoading(false);
      } else {
        // Anything else
        console.log('Error', err.message);
        setIsLoading(false);
      }
    }
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

          <Text px="5" py={2} bold>
            Nomor Handphone
          </Text>
          <Box p="5" backgroundColor="white">
            <Text numberOfLines={1}>{data.noHp}</Text>
          </Box>

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
          <Box p="5" backgroundColor="white">
            <Text numberOfLines={3}>{data.latitude + data.longitude}</Text>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LaporanDetail;

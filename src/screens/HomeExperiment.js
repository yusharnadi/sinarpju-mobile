/* eslint-disable react-native/no-inline-styles */
import {
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Box, HStack, Text, ScrollView, Flex} from 'native-base';
import axios from 'axios';
import {Host} from '../utils/Host';
import Loading from '../components/Loading';
import LaporanSingle from '../components/LaporanSingle';
import {useIsFocused} from '@react-navigation/native';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import Slider from '../components/Slider';
import useSWR from 'swr';
import {getLaporan, laporanUrlEndpoint} from '../apis/LaporanApi';
import Error from '../components/Error';

export default function Home({navigation}) {
  // const [laporan, setLaporan] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  // const isActive = useIsFocused();

  const {
    isLoading,
    error,
    data: laporan,
  } = useSWR(laporanUrlEndpoint, getLaporan);

  if (isLoading) {
    return <Loading />;
  }
  if (error) return <Text>Gagal memuat laporan . . .</Text>;

  // const fetchLaporan = () => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${Host}laporan?limit=10`)
  //     .then(function (response) {
  //       setLaporan(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       console.log('Done Fetching Laporan HOme');
  //       setIsLoading(false);
  //     });
  // };

  // React.useEffect(() => {
  //   fetchLaporan();
  // }, [isActive]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <Box bg="muted.50">
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <TopBar />
          <Slider />
          <Menu />

          {/* Laporan SECTION  */}
          <HStack bg="white" p="5" alignItems="center">
            <Text bold color="muted.600" fontSize="lg" flex={1}>
              Laporan Terbaru
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Laporan')}>
              <Text color="blue.800" bold>
                Semua
              </Text>
            </TouchableOpacity>
          </HStack>
          <Box
            mt="1"
            px="5"
            d="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center">
            {/* {isLoading ?? <Loading />}
            {laporan.success && laporan.data.length > 0 ? (
                laporan.data.map(item => {
                  return <LaporanSingle key={item.id} laporan={item} />;
                })
              ) : (
                <Loading />
              )} */}
            <FlatList
              data={laporan}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <LaporanSingle key={item.id} laporan={item} />
              )}
            />
          </Box>
        </ScrollView>
      </Box>
      <Flex px="5"></Flex>
    </SafeAreaView>
  );
}

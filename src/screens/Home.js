/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {Box, HStack, Text, ScrollView} from 'native-base';

import axios from 'axios';
import {Host} from '../utils/Host';
import Loading from '../components/Loading';
import LaporanSingle from '../components/LaporanSingle';
import {useIsFocused} from '@react-navigation/native';
import Menu from '../components/Menu';
import Slider from '../components/Slider';
import TopBar from '../components/TopBar';

export default function Home({navigation}) {
  const [laporan, setLaporan] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isActive = useIsFocused();

  const fetchLaporan = () => {
    setIsLoading(true);
    axios
      .get(`${Host}laporan?limit=20`)
      .then(function (response) {
        setLaporan(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log('Done Fetching Laporan HOme');
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchLaporan();
  }, [isActive]);

  return (
    <SafeAreaView>
      {console.log('ui render')}
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <Box bg="muted.50" w="full">
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <TopBar />
          <Slider />
          <Menu />

          {/* Laporan SECTIOn  */}
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
            {isLoading ?? <Loading />}
            {laporan.success && laporan.data.length > 0 ? (
              laporan.data.map(item => {
                return <LaporanSingle key={item.id} laporan={item} />;
              })
            ) : (
              <Loading />
            )}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {Box, HStack, Text, ScrollView} from 'native-base';
import Loading from '../components/Loading';
import LaporanSingle from '../components/LaporanSingle';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import Slider from '../components/Slider';
import useSWR from 'swr';
import {getLaporan, laporanUrlEndpoint} from '../apis/LaporanApi';

export default function Home({navigation}) {
  const {data: laporan} = useSWR(laporanUrlEndpoint, getLaporan);

  return (
    <SafeAreaView flex={1}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <Box bg="muted.50">
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}>
          <TopBar />
          <Slider />
          <Menu />
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
            {laporan?.success && laporan?.data.length > 0 ? (
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

import React from 'react';
import {HStack, Text, Heading, Spinner} from 'native-base';
import useSWR from 'swr';
import {fetcher} from '../utils/fetcher';
import LaporanSingle from './LaporanSingle';

export default function LaporanList() {
  const {data, error, isLoading} = useSWR(
    'https://sinarpju.digitaldev.id/api/laporan?limit=10',
    fetcher,
  );

  if (error) return <Text>failed to load</Text>;
  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center" m="5">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="blue.900" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  // console.log(data.success);
  if (data.success && data.data.length >= 1) {
    // console.log(data.data);
    let list = data.data.map(laporan => {
      return <LaporanSingle key={laporan.id} laporan={laporan} />;
    });

    return list;
  }
}

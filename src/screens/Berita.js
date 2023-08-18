import React from 'react';
import {Flex, Spinner, HStack, Heading} from 'native-base';
import {FlatList, SafeAreaView, Text} from 'react-native';
import useSWR from 'swr';
import {fetcher} from '../utils/fetcher';
import BeritaSingle from '../components/BeritaSingle';

function BeritaFlat() {
  const {data, error, isLoading} = useSWR(
    'https://mediacenter.singkawangkota.go.id/wp-json/wp/v2/posts?categories=65',
    fetcher,
  );

  if (error) {
    return <Text>Gagal memuat berita.</Text>;
  }

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

  if (data && data.length >= 1) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <BeritaSingle item={item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default function Berita() {
  return (
    <SafeAreaView>
      <Flex px="5">
        <BeritaFlat />
      </Flex>
    </SafeAreaView>
  );
}

import {Image} from 'react-native';
import React from 'react';
import {
  Box,
  HStack,
  Text,
  AspectRatio,
  Stack,
  Heading,
  Spinner,
} from 'native-base';
import useSWR from 'swr';
import BeritaSingle from './BeritaSingle';
import {fetcher} from '../utils/fetcher';

// const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BeritaList() {
  // const { data, error, isLoading } = useSWR('https://dishub.singkawangkota.go.id/wp-json/wp/v2/posts?per_page=6', fetcher);
  const {data, error, isLoading} = useSWR(
    'https://mediacenter.singkawangkota.go.id/wp-json/wp/v2/posts?category=65&per_page=12',
    fetcher,
  );

  if (error) return <Text>Gagal memuat berita.</Text>;
  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center" m="5" flex={1}>
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="blue.900" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  if (data && data.length >= 1) {
    let list = data.map(item => {
      return <BeritaSingle key={item.id} item={item} />;
    });
    return list;
  }
}

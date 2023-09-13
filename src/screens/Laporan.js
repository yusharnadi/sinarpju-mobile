import React from 'react';
import {
  Box,
  Fab,
  Icon,
  Flex,
  Spinner,
  HStack,
  Heading,
  Text,
} from 'native-base';
import {PlusIcon} from 'react-native-heroicons/solid';
import {FlatList, SafeAreaView} from 'react-native';
import useSWRInfinite from 'swr/infinite';
import LaporanSingle from '../components/LaporanSingle';
import {getLaporanPaginated} from '../apis/LaporanApi';

export default function Laporan({navigation}) {
  const getKey = (pageIndex, previousPageData) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.length) return null;
    return `laporan?page=${pageIndex}`;
  };

  const {data, error, isLoading, size, setSize} = useSWRInfinite(
    getKey,
    getLaporanPaginated,
    {initialSize: 1, parallel: false},
  );

  if (error) return <Text>Gagal memuat laporan dari server.</Text>;

  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center" m="5">
        <Spinner accessibilityLabel="Loading Laporan" />
        <Heading color="blue.900" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  const laporan = data ? [].concat(...data) : [];

  return (
    <Box>
      <SafeAreaView>
        <Flex px="5">
          <FlatList
            data={laporan}
            renderItem={({item}) => <LaporanSingle laporan={item} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={() => setSize(size + 1)}
            ListFooterComponent={
              <Spinner accessibilityLabel="Loading Laporan" />
            }
          />
        </Flex>
      </SafeAreaView>
      <Fab
        onPress={() => navigation.navigate('Lapor')}
        renderInPortal={false}
        shadow={2}
        size="lg"
        background="blue.900"
        icon={<Icon color="white" as={PlusIcon} name="plus" size="lg" />}
      />
    </Box>
  );
}

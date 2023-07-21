import React from 'react';
import {Box, Fab, Icon, Flex, Spinner, HStack, Heading} from 'native-base';
import {PlusIcon} from 'react-native-heroicons/solid';
import {FlatList, SafeAreaView, Text} from 'react-native';
import useSWR from 'swr';
import {fetcher} from '../utils/fetcher';
import LaporanSingle from '../components/LaporanSingle';

function LaporanFlat() {
  const {data, error, isLoading} = useSWR(
    'https://sinarpju.digitaldev.id/api/laporan',
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
    return (
      <FlatList
        data={data.data}
        renderItem={({item}) => <LaporanSingle laporan={item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default function Laporan({navigation}) {
  return (
    <Box>
      <SafeAreaView>
        <Flex px="5">
          <LaporanFlat />
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

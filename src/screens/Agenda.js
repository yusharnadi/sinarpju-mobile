import React from 'react';
import {Flex, Spinner, HStack, Heading} from 'native-base';
import {FlatList, SafeAreaView, Text} from 'react-native';
import useSWR from 'swr';
import {fetcher} from '../utils/fetcher';
import AgendaList from '../components/AgendaList';
import {Host} from '../utils/Host';

function AgendaFlat() {
  const {data, error, isLoading} = useSWR(`${Host}agenda?limit=20`, fetcher);

  if (error) {
    return <Text>Gagal memuat agenda.</Text>;
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
  //   console.log(data);
  if (data.success && data.data.length >= 1) {
    return (
      <FlatList
        data={data.data}
        renderItem={({item}) => <AgendaList agenda={item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default function Agenda() {
  return (
    <SafeAreaView>
      <Flex px="5">
        <AgendaFlat />
      </Flex>
    </SafeAreaView>
  );
}

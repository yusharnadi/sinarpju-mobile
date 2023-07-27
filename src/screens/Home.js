import {Image, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  HStack,
  Text,
  Flex,
  Icon,
  AspectRatio,
  ScrollView,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo.svg';
import Swiper from 'react-native-swiper';
// import BeritaList from '../components/BeritaList';
import {
  MegaphoneIcon,
  NewspaperIcon,
  InboxArrowDownIcon,
  CalendarDaysIcon,
} from 'react-native-heroicons/outline';
import LaporanList from '../components/LaporanList';
import axios from 'axios';
import {Host} from '../utils/Host';
import Loading from '../components/Loading';
import LaporanSingle from '../components/LaporanSingle';
import {useIsFocused} from '@react-navigation/native';

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

  const LaporanCollection = () => {
    if (laporan && laporan.length > 0) {
      let list = laporan.map(item => {
        return <LaporanSingle laporan={item} />;
      });
      return list;
    }
  };

  return (
    <SafeAreaView>
      {console.log('ui render')}
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <Box bg="muted.50" w="full">
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <Box bgColor="blue.900" px="5" py="2.5">
            <HStack justifyContent="space-between" alignItems="center">
              <Logo />
              <TouchableOpacity onPress={() => {}}>
                <Flex direction="row" align="center">
                  <Text bold fontSize="xs" color="light.50" mr="2">
                    Masuk
                  </Text>
                  <Icon
                    as={FontAwesomeIcon}
                    icon={faSignInAlt}
                    color="muted.50"
                    size="12"
                  />
                </Flex>
              </TouchableOpacity>
            </HStack>
          </Box>

          {/* SLIDER  */}
          <AspectRatio ratio={16 / 9} width="full">
            <Box>
              <Swiper
                autoplay={true}
                loop={true}
                autoplayTimeou={10}
                loadMinimal={true}>
                <Image
                  source={{
                    uri: 'https://dishub.singkawangkota.go.id/wp-content/uploads/2023/03/20230301-B-1068x801.jpg',
                  }}
                  resizeMode="cover"
                  flex={1}
                />
                <Image
                  source={{
                    uri: 'https://dishub.singkawangkota.go.id/wp-content/uploads/2023/03/20230301-A.jpg',
                  }}
                  resizeMode="cover"
                  flex={1}
                />
                <Image
                  source={{
                    uri: 'https://dishub.singkawangkota.go.id/wp-content/uploads/2023/03/20230308-B-1024x589.jpg',
                  }}
                  resizeMode="cover"
                  flex={1}
                />
              </Swiper>
            </Box>
          </AspectRatio>

          {/* MENU  */}
          <Box
            bg="white"
            w="full"
            my="2"
            p="5"
            d="flex"
            flexDirection="row"
            justifyContent="space-between">
            <TouchableOpacity onPress={() => navigation.navigate('Lapor')}>
              <Center>
                <Flex
                  w="16"
                  h="16"
                  bg="blue.900"
                  borderRadius="full"
                  justify="center"
                  align="center">
                  <Icon as={MegaphoneIcon} color="muted.50" />
                  {/* <MegaphoneIcon /> */}
                </Flex>
                <Text mt="2" fontSize="xs">
                  Lapor
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Berita')}>
              <Center>
                <Flex
                  w="16"
                  h="16"
                  bg="blue.900"
                  borderRadius="full"
                  justify="center"
                  align="center">
                  <Icon
                    as={NewspaperIcon}
                    name="NewspaperIcon"
                    color="muted.50"
                    size="6"
                  />
                </Flex>
                <Text mt="2" fontSize="xs">
                  Berita
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Flex
                  w="16"
                  h="16"
                  bg="blue.900"
                  borderRadius="full"
                  justify="center"
                  align="center">
                  <Icon
                    as={InboxArrowDownIcon}
                    name="InboxArrowDownIcon"
                    color="muted.50"
                  />
                </Flex>
                <Text
                  mt="2"
                  w="16"
                  textAlign="center"
                  fontSize="xs"
                  lineHeight="xs">
                  Masukan & Saran
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Flex
                  w="16"
                  h="16"
                  bg="blue.900"
                  borderRadius="full"
                  justify="center"
                  align="center">
                  <Icon
                    as={CalendarDaysIcon}
                    name="CalendarDaysIcon"
                    color="muted.50"
                  />
                </Flex>
                <Text
                  mt="2"
                  w="16"
                  textAlign="center"
                  fontSize="xs"
                  lineHeight="xs">
                  Agenda
                </Text>
              </Center>
            </TouchableOpacity>
          </Box>

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
            //   bg="white"
            px="5"
            d="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center">
            {/* <LaporanList /> */}
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

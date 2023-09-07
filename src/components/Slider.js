import React from 'react';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {Host} from '../utils/Host';
import {Text} from 'react-native';
import useSWR from 'swr';
import {fetcher} from '../utils/fetcher';
import Loading from './Loading';

const Slider = () => {
  const {isLoading, error, data} = useSWR(`${Host}slider`, fetcher);
  if (error) return <Text>Error loading slider</Text>;
  if (isLoading) return <Loading />;

  return (
    <FlatListSlider
      data={data.data}
      imageKey="gambar"
      timer={5000}
      indicatorContainerStyle={{position: 'absolute', bottom: 20}}
      indicatorActiveColor={'#1e3a8a'}
      indicatorInActiveColor={'#ffffff'}
      indicatorActiveWidth={30}
      animation
    />
  );
};

export default Slider;

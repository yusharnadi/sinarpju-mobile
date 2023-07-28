import {Image} from 'react-native';
import React from 'react';
import {AspectRatio, Box} from 'native-base';
import Swiper from 'react-native-swiper';

const Slider = () => {
  return (
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
  );
};

export default Slider;

import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {AspectRatio} from 'native-base';
import Swiper from 'react-native-swiper';

const Slider = () => {
  return (
    <AspectRatio ratio={16 / 9} width="full">
      <Swiper
        autoplay={true}
        loop={true}
        autoplayTimeou={10}
        loadMinimal={true}>
        <View style={styles.sliderWrapper}>
          <Image
            source={require('../assets/file-1.jpg')}
            resizeMode="cover"
            flex={1}
          />
        </View>
        <View style={styles.sliderWrapper}>
          <Image
            source={require('../assets/file-2.jpg')}
            resizeMode="cover"
            flex={1}
          />
        </View>
      </Swiper>
    </AspectRatio>
  );
};

export default Slider;
const styles = StyleSheet.create({
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

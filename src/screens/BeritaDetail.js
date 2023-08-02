import {
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AspectRatio, Box, Text} from 'native-base';
import axios from 'axios';
import Loading from '../components/Loading';
import RenderHtml from 'react-native-render-html';

const BeritaDetail = ({route, navigation}) => {
  const [berita, setBerita] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const id_berita = route.params.id;
  const {width} = useWindowDimensions();

  const fetchBerita = () => {
    setIsLoading(true);
    axios
      .get(
        `https://mediacenter.singkawangkota.go.id/wp-json/wp/v2/posts/${id_berita}`,
      )
      .then(result => {
        setBerita(result.data);
        // console.log(result.data.content.rendered);
      })
      .catch(error => {
        setIsError(error);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    fetchBerita();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text>Gagal memuat berita.</Text>;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Box flex="1" backgroundColor="muted.50">
          <AspectRatio w="100%" ratio={16 / 9}>
            {berita && (
              <Image
                source={{
                  uri: berita.better_featured_image.source_url,
                }}
              />
            )}
          </AspectRatio>
          <Text px="5" py={2} bold numberOfLines={2}>
            {berita?.title?.rendered}
          </Text>
          <Box p="5" backgroundColor="white">
            {berita && (
              <RenderHtml
                contentWidth={width}
                source={{html: berita.content.rendered}}
                tagsStyles={tagsStyles}
              />
            )}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeritaDetail;
const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: 'gray',
  },
  a: {
    color: 'green',
  },
  p: {
    color: '#000',
  },
};

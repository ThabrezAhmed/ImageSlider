import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector, useDispatch} from 'react-redux';
import {getImages, filterImages} from '../redux/actions';

const {width} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const ImageSliderScreen = () => {
  // state and props
  const [imageIndex, setImageIndex] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const imageReducer = useSelector(state => state.imageReducer);
  const imageStatus = imageReducer.status;
  const authorName = imageReducer.filteredData.authorName;
  const imageUrl = imageReducer.filteredData.imageUrl;
  console.log('imageUrl ' + JSON.stringify(imageUrl));

  //useEffects
  useEffect(() => {
    dispatch(getImages());
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(filterImages());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // render
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.sliderContainer}>
          {imageStatus === 'SUCCESS' ? (
            <>
              <View style={styles.overlayView}>
                <Text style={styles.authorText}>{authorName[imageIndex]}</Text>
              </View>
              <SliderBox
                images={imageUrl}
                sliderBoxHeight={300}
                onCurrentImagePressed={index =>
                  console.log(`image ${index} pressed`)
                }
                currentImageEmitter={index => setImageIndex(index)}
                parentWidth={200}
              />
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 32,
    // backgroundColor: 'red',
  },
  scrollView: {
    flex: 1,
    width,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    height: 300,
    width: 200,
    // backgroundColor: 'blue',
  },
  overlayView: {
    position: 'absolute',
    zIndex: 2,
    height: 100,
    width: '100%',
    // backgroundColor: 'red',
  },
  authorText: {
    fontSize: 30,
    color: 'yellow',
  },
});

export default ImageSliderScreen;

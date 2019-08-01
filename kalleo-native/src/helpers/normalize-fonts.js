import { Platform, PixelRatio } from 'react-native';

const normalizeFont = (size) => {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }

  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
};

export default normalizeFont;

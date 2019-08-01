import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styles from './styles';

const BackgroundImage = ({ source, children }) => (
  <Image source={source} style={styles.backgroundImage}>{children}</Image>
);

BackgroundImage.propTypes = {
  source: PropTypes.node.isRequired,
  children: PropTypes.node,
};

BackgroundImage.defaultProps = {
  children: null,
};

export default BackgroundImage;

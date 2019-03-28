import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Font } from 'expo';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'

export default class Splash extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'dosis-regular': require('../../../assets/fonts/Dosis-Regular.ttf'),
      'dosis-medium': require('../../../assets/fonts/Dosis-Medium.ttf'),
      'dosis-light': require('../../../assets/fonts/Dosis-Light.ttf'),
      'dosis-semiBold': require('../../../assets/fonts/Dosis-SemiBold.ttf'),
    })
    setTimeout(() => this.props.navigation.navigate('MainApp'), 1000);
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={IMAGES.TT_LOGO_TITLE_LG}
          style={styles.logo}/>
      </View>
    )
  }
}

const { DEVICE_WIDTH } = sharedStyles;
const logoWidth = DEVICE_WIDTH * 0.33;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  logo: {
	  width: logoWidth,
    height: logoWidth / IMAGES.TT_LOGO_TITLE_ASPECT
  }
});

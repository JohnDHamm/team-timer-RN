import React, { Component } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import IMAGES from '@assets/images'
import sharedStyles from '../styles/shared_styles';

export default class NextButton extends Component {

  render() {

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigateNext()}
        >
        <Text style={styles.label}>{this.props.label}</Text>
        <Image
          source={IMAGES.NEXT_ARROW}
          style={styles.nextArrow}
          />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 20,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 5,
  },
  nextArrow: {
    width: 40,
    height: 40 / IMAGES.NEXT_ARROW_ASPECT,
  }
})

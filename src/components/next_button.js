import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Haptic } from 'expo';

import IMAGES from '@assets/images'
import sharedStyles from '../styles/shared_styles';

export default class NextButton extends Component {

  onPress() {
    Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
    this.props.onPress();
  }

  render() {

    return (
      <View>
        {!this.props.disabled ?
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.onPress()}>
            <Text style={styles.label}>{this.props.label}</Text>
            <Image
              source={IMAGES.NEXT_ARROW}
              style={styles.nextArrow}
            />
          </TouchableOpacity>
          :
          <View style={styles.container}>
            <Text style={[styles.label, styles.disabledLabel]}>{this.props.label}</Text>
            <Image
              source={IMAGES.NEXT_ARROW}
              style={[styles.nextArrow, {tintColor: sharedStyles.COLOR_LIGHT_GRAY}]}/>
          </View>
        }
      </View>
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
  disabledLabel: {
    color: sharedStyles.COLOR_LIGHT_GRAY,
  },
  nextArrow: {
    width: 40,
    height: 40 / IMAGES.NEXT_ARROW_ASPECT,
  }
})

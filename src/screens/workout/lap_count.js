import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'

import NextButton from '../../components/next_button';
import {Haptic} from 'expo';

const MAX_LAPS = 99;

export default class LapCount extends Component {

  static navigationOptions = {
    title: 'How many laps?',
    headerBackTitle: 'Laps',
  };

  constructor(props) {
    super(props);
    this.state = {
      lapCount: 4
    }
  };

  handleCountChange(direction) {
    let newCount;

    if (direction === "down") {
      if (this.state.lapCount < 2) return;
      newCount = this.state.lapCount - 1;
    } else {
      if (this.state.lapCount > (MAX_LAPS - 1)) return;
      newCount = this.state.lapCount + 1;
    }

    Haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
    this.setState({lapCount: newCount});
  }

  render(){

    return(
      <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
        <View style={{flex: 1}}>
          <View style={styles.topContainer}>
            <Text style={styles.lapCount}>{this.state.lapCount}</Text>
          </View>
          <View style={styles.middleContainer}>
            <TouchableOpacity
              onPress={() => this.handleCountChange("down")}
              >
              <Image
                source={IMAGES.UP_ARROW}
                style={[styles.upArrow, styles.downArrow]}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleCountChange("up")}
            >
              <Image
                source={IMAGES.UP_ARROW}
                style={styles.upArrow}/>
            </TouchableOpacity>
          </View>
          <View style={[{flex: 0.1}, sharedStyles.LAYOUT_NEXT_BUTTON_CONTAINER]}>
            <NextButton
              label={'distance'}
              disabled={false}
              onPress={() => this.props.navigation.navigate(`LapDistance`, {lapCount: this.state.lapCount})}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
	  flex: 0.75,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lapCount: {
	  color: sharedStyles.COLOR_GREEN,
    fontSize: 250,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  middleContainer: {
	  flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  upArrow: {
    width: 50,
    height: 50 / IMAGES.UP_ARROW_ASPECT,
    marginHorizontal: 30,
  },
  downArrow: {
    transform: [{rotate: '180deg'}],
  }
});

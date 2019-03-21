import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import NextButton from '../../components/next_button'
import {Haptic} from 'expo';

export default class LapMetric extends Component {

  static navigationOptions = {
    title: 'Measurement unit?',
    headerBackTitle: 'Metric',
  }

  constructor(props) {
    super(props);
    this.state = {
      lapMetric: null,
      disableNextButton: true
    }
  };

  onSelection(metric) {
    metric !== this.state.lapMetric ? Haptic.impact(Haptic.ImpactFeedbackStyle.Medium) : null;
    this.setState({lapMetric: metric, disableNextButton: false})
  }

  render(){
    const { lapCount, lapDistance } = this.props.navigation.state.params;
    // console.log("lapCount", lapCount);
    // console.log("lapDistance", lapDistance);

    return(
      <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
        <View style={[{flex: 0.9}, styles.container]}>
          <Text style={styles.distance}>{lapDistance}{this.state.lapMetric}</Text>
          <TouchableOpacity
            style={styles.selectMetric}
            onPress={() => this.onSelection("m")}
            >
            <Text
              style={[
                styles.metricText,
                this.state.lapMetric === "m" ? styles.metricSelected : styles.metricUnselected
                ]}
            >meters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectMetric}
            onPress={() => this.onSelection("yd")}
            >
            <Text
              style={[
                styles.metricText,
                this.state.lapMetric === "yd" ? styles.metricSelected : styles.metricUnselected
              ]}
            >yards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectMetric}
            onPress={() => this.onSelection("km")}
            >
            <Text
              style={[
                styles.metricText,
                this.state.lapMetric === "km" ? styles.metricSelected : styles.metricUnselected
              ]}
            >kilometers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectMetric}
            onPress={() => this.onSelection("mi")}
            >
            <Text
              style={[
                styles.metricText,
                this.state.lapMetric === "mi" ? styles.metricSelected : styles.metricUnselected
              ]}
            >miles</Text>
          </TouchableOpacity>
        </View>

        <View style={[{flex: 0.1}, sharedStyles.LAYOUT_NEXT_BUTTON_CONTAINER]}>
          <NextButton
            label={'select athletes'}
            disabled={this.state.disableNextButton}
            onPress={() => this.props.navigation.navigate(`SelectAthletes`, { lapCount: lapCount, lapDistance: lapDistance, lapMetric: this.state.lapMetric })}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  distance: {
    fontSize: 80,
    color: sharedStyles.COLOR_PURPLE,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    marginBottom: 10,
  },
  selectMetric: {
    marginVertical: 7,
  },
  metricText: {
    fontSize: 50,
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
  },
  metricSelected: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    color: sharedStyles.COLOR_GREEN,
  },
  metricUnselected: {
    color: sharedStyles.COLOR_LIGHT_GRAY
  }
});

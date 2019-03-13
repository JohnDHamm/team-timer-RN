import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

import TimeConversion from '../../utility/time_conversion';
import _ from 'lodash';

import Separator from '../../components/separator';
import SecondaryButton from '../../components/secondary_button';
import sharedStyles from '../../styles/shared_styles';

const resultsWidth = sharedStyles.DEVICE_WIDTH * 0.5;

export default class WorkoutDetail extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('headerTitle', 'Result detail')
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedWorkout: {}
    }
  }

  componentDidMount() {
    const { selectedWorkout } = this.props.navigation.state.params;
    this.setState({ selectedWorkout });
  }

  renderLaps(lapsArray) {
    return _.map(lapsArray, (lapTime, index) => {
      return (
        <View key={lapTime} style={styles.lapRow}>
          <Text style={styles.lapNum}>lap {index + 1}:</Text>
          <Text style={styles.lapTime}>{TimeConversion(lapTime)}</Text>
        </View>
      )
    })
  }

  renderSummary(lapsArray) {
    const totalTime = lapsArray.reduce((a, b) => a + b);
    const lapAverage = Math.floor(totalTime / lapsArray.length);
    return (
      <View>
        <View style={styles.lapRow}>
          <Text style={styles.lapNum}>total:</Text>
          <Text style={styles.totalTime}>{TimeConversion(totalTime)}</Text>
        </View>
        <View style={styles.lapRow}>
          <Text style={styles.lapNum}>avg:</Text>
          <Text style={styles.lapTime}>{TimeConversion(lapAverage)}</Text>
        </View>
      </View>
    )
  }

  renderAthletes() {
    if (!this.state.selectedWorkout.workout) return;

    return _.map(this.state.selectedWorkout.workout, athlete => {
      // console.log("athlete", athlete.athlete)
      return (
        <View key={athlete.athlete}>
          <View style={styles.nameBlock}>
            <Text style={styles.athleteName}>{athlete.athlete}</Text>
          </View>
          <View style={styles.resultsBlock}>
            <View style={styles.lapsBlock}>
              { this.renderLaps(athlete.laps) }
            </View>
            <Separator
              width={resultsWidth}
              color={sharedStyles.COLOR_GREEN}/>
            <View style={styles.lapsBlock}>
              { this.renderSummary(athlete.laps) }
            </View>
          </View>
        </View>
      )
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          { this.renderAthletes() }
          {/*<View style={styles.deleteBtn}>
            <SecondaryButton
              label={'delete result'}
              color={sharedStyles.COLOR_PURPLE}
            />
          </View>*/}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignSelf: 'stretch'
	},
  description: {
	  color: 'purple',
    fontSize: 20,
    padding: 10
  },
  nameBlock: {
	  backgroundColor: sharedStyles.COLOR_GREEN,
    paddingBottom: 5,
  },
  resultsBlock: {
	  justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  athleteName: {
    textAlign: 'center',
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 40,
    color: sharedStyles.COLOR_PURPLE
  },
  lapsBlock: {
	  width: resultsWidth,
  },
  lapRow: {
	  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lapNum: {
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 30,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  lapTime: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 30,
    color: sharedStyles.COLOR_PURPLE
  },
  totalTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  avgTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_GREEN
  },
  // deleteBtn: {
	//   justifyContent: 'center',
  //   alignItems: 'center',
	//   paddingVertical: 20
  // }

});

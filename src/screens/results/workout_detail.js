import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

import TimeConversion from '../../utility/time_conversion';
import _ from 'lodash';

// import sharedStyles from '../../styles/sharedStyles';

export default class WorkoutDetail extends Component {

  static navigationOptions = {
    title: 'Workout detail',
    // headerBackTitle: 'Workout',
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
    return _.map(lapsArray, lap => {
      return (
        <Text key={lap} style={styles.lap}>{TimeConversion(lap)}</Text>
      )
    })
  }

  renderSummary(lapsArray) {
    const totalTime = lapsArray.reduce((a, b) => a + b);
    const lapAverage = Math.floor(totalTime / lapsArray.length);
    return (
      <View>
        <Text style={styles.totalTime}>{TimeConversion(totalTime)}</Text>
        <Text style={styles.lapAvg}>{TimeConversion(lapAverage)}</Text>
      </View>
    )
  }

  renderAthletes() {
    if (!this.state.selectedWorkout.workout) return;

    return _.map(this.state.selectedWorkout.workout, athlete => {
      // console.log("athlete", athlete.athlete)
      return (
        <View key={athlete.athlete}>
          <Text style={styles.athleteName}>{athlete.athlete}</Text>
          { this.renderLaps(athlete.laps) }
          { this.renderSummary(athlete.laps) }
        </View>
      )
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.description}>{this.state.selectedWorkout.description}</Text>
        <ScrollView>
          { this.renderAthletes() }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  description: {
	  color: 'purple',
    fontSize: 20,
    padding: 10
  },
  athleteName: {
	  fontSize: 40
  },
  lap: {
	  fontSize: 20
  },
  totalTime: {
	  fontWeight: 'bold',
    fontSize: 20,
    color: 'purple',
  },
  lapAvg: {
	  color: 'gray'
  }

});

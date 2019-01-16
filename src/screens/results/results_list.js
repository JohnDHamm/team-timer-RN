import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import _ from 'lodash';
// import sharedStyles from '../../styles/sharedStyles';

export default class ResultsList extends Component {

  static navigationOptions = {
    title: 'Saved Workouts',
    headerBackTitle: 'Workouts',
  }

  constructor(props) {
    super(props);
    this.state = {
      workouts: {},
    }
  }

  componentDidMount() {
    //get workouts from AsyncStorage
    const mockWorkoutsStore = {
      154638098800: {
        id: 154638098800,
        description: "Jan 1 - 10x250m",
        workout: [
          {
            athlete: "Bob",
            laps: [ 2650000, 2623400, 2512341 ]
          },
          {
            athlete: "Derek",
            laps: [ 2934000, 2905420, 2912331 ]
          },
          {
            athlete: "Stevie",
            laps: [ 2700880, 2783420, 2745341 ]
          },
          {
            athlete: "Zoe",
            laps: [ 21040002, 21033400, 21012341 ]
          },
        ]
      },
      1547676061798: {
        id: 1547676061798,
        description: "Jan 16 - 5x100yd",
        workout: [
          {
            athlete: "Bob",
            laps: [ 650000, 623400, 512341 ]
          },
          {
            athlete: "Derek",
            laps: [ 934000, 905420, 912331 ]
          },
          {
            athlete: "Tara",
            laps: [ 700880, 783420, 745341 ]
          },
          {
            athlete: "Zoe",
            laps: [ 1040002, 1033400, 1012341 ]
          },
        ]
      },
    }

    this.setState({ workouts: mockWorkoutsStore }, () => console.log("workouts:", this.state.workouts))
  }


  renderWorkouts() {
    return _.map(this.state.workouts, workout => {
      return (
        <TouchableOpacity
          key={workout.id}
          onPress={() => this.selectWorkout(workout)}
        >
          <Text style={styles.workout}>{workout.description}</Text>
        </TouchableOpacity>
      )
    })
  }

  selectWorkout(workout) {
    this.props.navigation.navigate(`WorkoutDetail`, { selectedWorkout: workout });
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          {this.renderWorkouts()}
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
  workout: {
	  color: 'purple',
    fontSize: 20,
    padding: 10
  }
});

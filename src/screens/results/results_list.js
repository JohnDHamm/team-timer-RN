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
        description: "Jan 1 - 3 x 250m",
        workout: [
          {
            athlete: "Bob",
            laps: [ 60000, 62340, 62341 ]
          },
          {
            athlete: "Derek",
            laps: [ 64000, 65420, 62331 ]
          },
          {
            athlete: "Stevie",
            laps: [ 60880, 63420, 65341 ]
          },
          {
            athlete: "Zoe",
            laps: [ 64002, 62340, 62341 ]
          },
        ]
      },
      1547676061798: {
        id: 1547676061798,
        description: "Jan 16 - 4 x 100yd",
        workout: [
          {
            athlete: "Bob",
            laps: [ 125000, 122300, 121241, 124363 ]
          },
          {
            athlete: "Derek",
            laps: [ 124000, 125420, 123331, 122845 ]
          },
          {
            athlete: "Tara",
            laps: [ 120880, 123420, 125341, 122980 ]
          },
          {
            athlete: "Zoe",
            laps: [ 3670000, 1033400, 1012341, 1035672 ]
          },
        ]
      },
    }

    // this.setState({ workouts: mockWorkoutsStore }, () => console.log("workouts from store:", this.state.workouts))
    this.setState({ workouts: mockWorkoutsStore });
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
    // console.log("selecting:", workout)
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

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';

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
    AsyncStorage.getItem('WorkoutStore', (err, res) => {
      console.log("res", JSON.parse(res));
      this.setState({ workouts: JSON.parse(res) });
    });
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

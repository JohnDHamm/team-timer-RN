import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import _ from 'lodash';

import StoreUtils from '../../utility/store_utils';

// import sharedStyles from '../../styles/sharedStyles';

export default class ResultsList extends Component {

  static navigationOptions = {
    title: 'Saved Workouts',
    headerBackTitle: 'Workouts',
  }

  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      showEmptyMessage: true
    }
  }

  componentDidMount() {
  }

  getResults(){
    // console.log("onWillFocus - getResults");
    StoreUtils.getStore('WorkoutStore')
      .then(res => {
        if (res !== null) {
          this.sortList(res);
        }
      })
  }

  sortList(workouts) {
    const sortedList = _.sortBy(workouts, ['id']).reverse();
    // console.log("sortedList", sortedList);
    this.setState({workouts: sortedList}, () => {
      this.setState({showEmptyMessage: false});
    })
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

  // THIS IS TEMPORARY FOP TESTING THAT NEW RESULTS ARE AUTO LOADING
  deleteAllWorkouts() {
    AsyncStorage.removeItem('WorkoutStore', () => {
      console.log("removed all workouts");
      this.setState({workouts: {}, showEmptyMessage: true});
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getResults()}
        />
        { this.state.showEmptyMessage &&
        <Text>no current workouts</Text>
        }
        <ScrollView>
          {this.renderWorkouts()}
        </ScrollView>
        <Button title="DELETE ALL" onPress={() => this.deleteAllWorkouts()}/>
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

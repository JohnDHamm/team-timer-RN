import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import _ from 'lodash';

import StoreUtils from '../../utility/store_utils';

import IMAGES from '@assets/images';
import sharedStyles from '../../styles/shared_styles';

export default class ResultsList extends Component {

  static navigationOptions = {
    title: 'Results',
    headerBackTitle: 'Results',
  }

  constructor(props) {
    super(props);
    this.state = {
      workoutStore: {},
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
          // console.log("WorkoutStore", res);
          this.setState({workoutStore: res});
          this.sortList(res);
        }
      })
  }

  sortList(workouts) {
    const sortedList = _.sortBy(workouts, ['id']).reverse();
    // console.log("sortedList", sortedList);
    if (sortedList.length) {
      this.setState({workouts: sortedList}, () => {
        this.setState({showEmptyMessage: false});
      })
    } else {
      this.setState({showEmptyMessage: true});
    }
  }

  renderWorkouts() {
    return _.map(this.state.workouts, workout => {
      return (
        <TouchableOpacity
          style={styles.workoutBtn}
          key={workout.id}
          onPress={() => this.selectWorkout(workout)}
        >
          <Text style={styles.workoutLabel}>{workout.description}</Text>
        </TouchableOpacity>
      )
    })
  }

  selectWorkout(workout) {
    this.props.navigation.navigate(`WorkoutDetail`, { headerTitle: workout.description,  selectedWorkout: workout, workoutStore: this.state.workoutStore });
  }

  // THIS IS TEMPORARY FOP TESTING THAT NEW RESULTS ARE AUTO LOADING
  deleteAllWorkouts() {
    if (this.state.workouts.length > 0) {
      StoreUtils.removeStore('WorkoutStore')
        .then(() => {
          // console.log("removed all workouts");
          this.setState({workouts: {}, showEmptyMessage: true});
        })
    }
  }

  render(){
    return(
      <View style={[sharedStyles.LAYOUT_MAIN_STRETCH]}>
        <NavigationEvents
          onWillFocus={() => this.getResults()}
        />

        { this.state.showEmptyMessage ?
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyStopwatch}
                source={IMAGES.STOPWATCH_MED}
                />
              <Text style={styles.emptyResults}>You do not have any saved results!</Text>
            </View>
          :
            <ScrollView>
              {this.renderWorkouts()}
            </ScrollView>
        }
        {/*<Button
          title="DELETE ALL"
          onPress={() => this.deleteAllWorkouts()}/>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
  emptyStopwatch: {
	  width: 80,
    height: 80 / IMAGES.STOPWATCH_ASPECT,
    tintColor: sharedStyles.COLOR_RED,
    marginBottom: 10
  },
  emptyResults: {
	  fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 25,
    color: sharedStyles.COLOR_RED
  },
  workoutBtn: {
    marginBottom: 20,
    paddingLeft: 10
  },
  workoutLabel: {
	  color: sharedStyles.COLOR_PURPLE,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
  }
});

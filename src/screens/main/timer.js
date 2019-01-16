import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class Timer extends Component {

  // static navigationOptions = {
  //   title: 'Timer',
  // }

  cancelWorkout() {
    console.log("cancelling workout")
    this.props.navigation.goBack()
  }

  workoutComplete(workoutData) {
    console.log("completed workout")
    this.props.navigation.navigate('ResultsList', { workoutData: workoutData })
  }

  render(){
    const { lapCount, lapDistance, lapMetric, athleteIDs } = this.props.navigation.state.params;
    console.log("lapCount", lapCount);
    console.log("lapDistance", lapDistance);
    console.log("lapMetric", lapMetric);
    console.log("athleteIDs", athleteIDs);
    const workoutData = {
      description: `Jan 15 - ${lapCount} x ${lapDistance}${lapMetric}`,
    }

    return(
      <View style={styles.container}>
        <Text>{workoutData.description}</Text>
        <Button
          title="cancel"
          onPress={() => this.cancelWorkout()} />
        <Button
          title="start timer"
          onPress={() => this.workoutComplete(workoutData)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
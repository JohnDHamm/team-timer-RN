import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class WorkoutDetail extends Component {

  static navigationOptions = {
    title: 'Workout detail',
    // headerBackTitle: 'Workout',
  }

  render(){
    // const { workoutData, timer } = this.props.navigation.state.params;
    // console.log("workoutData", workoutData);

    return(
      <View style={styles.container}>
        <Text>Detail view of workout</Text>
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

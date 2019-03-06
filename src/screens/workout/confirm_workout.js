import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

// import sharedStyles from '../../styles/sharedStyles';

export default class ConfirmWorkout extends Component {

  static navigationOptions = {
    title: 'Confirm workout',
    headerBackTitle: 'Athletes',
  };

  constructor(props) {
    super(props);
    this.state = {
      startButtonLabel: "start workout"
    }
  };

  componentDidMount() {
  }

  startWorkout() {
    const { lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    this.setState({startButtonLabel: "do workout again"})
    this.props.navigation.navigate(`Timer`, {
      lapCount,
      lapDistance,
      lapMetric,
      selectedAthletes
    })
  }

  resetWorkout() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LapCount' })],
    });
    this.props.navigation.dispatch(resetAction);
  }


  render(){
    const { lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    console.log("selectedAthletes", selectedAthletes);
    const athletesTotal = selectedAthletes.length;

    return(
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Laps: {lapCount} x {lapDistance}{lapMetric}</Text>
          <Text style={styles.details}>{athletesTotal} athletes selected</Text>
        </View>
        <View style={styles.startButton}>
          <Button
            title={this.state.startButtonLabel}
            onPress={() => this.startWorkout()}/>
        </View>
        <View style={styles.resetButton}>
          <Button title={"reset workout"} onPress={() => this.resetWorkout()}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: .6,
    paddingTop: 20,
  },
  details: {
    fontSize: 20
  },
  startButton: {
    flex: .2,
  },
  resetButton: {
    flex: .2,
  }
});

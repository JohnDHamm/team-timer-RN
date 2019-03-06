import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import _ from 'lodash';

// import sharedStyles from '../../styles/sharedStyles';

export default class ConfirmWorkout extends Component {

  static navigationOptions = {
    title: 'Confirm workout',
    headerBackTitle: 'Confirm',
  };

  constructor(props) {
    super(props);
    this.state = {
      startButtonLabel: "start workout"
    }
  };

  componentDidMount() {
  }

  renderAthletes(athletes) {
    const sortedAthletes = athletes.sort();
    return _.map(sortedAthletes, athlete => {
      return (
        <Text key={athlete} style={styles.athleteName}>{athlete}</Text>
      )
    })
  }

  startWorkout() {
    const { lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    // this.setState({startButtonLabel: "do workout again"});
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

    return(
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Laps: {lapCount} x {lapDistance}{lapMetric}</Text>
          <Text style={styles.details}>{selectedAthletes.length} athletes selected</Text>
          {this.renderAthletes(selectedAthletes)}
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
    alignItems: 'center',
    paddingTop: 20,
  },
  details: {
    fontSize: 30
  },
  athleteName: {
    fontSize: 20,
    color: 'purple',
  },
  startButton: {
    flex: .2,
  },
  resetButton: {
    flex: .2,
  }
});

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class LapMetric extends Component {

  static navigationOptions = {
    title: 'Measurement Unit?',
    headerBackTitle: 'Metric',
  }

  constructor(props) {
    super(props);
    this.state = {
      lapMetric: null,
      disableNextButton: true
    }
  };

  onSelection(metric) {
    this.setState({lapMetric: metric, disableNextButton: false})
  }

  render(){
    const { lapCount, lapDistance } = this.props.navigation.state.params;
    // console.log("lapCount", lapCount);
    // console.log("lapDistance", lapDistance);

    return(
      <View style={styles.container}>
        <Text style={styles.distance}>{lapDistance}{this.state.lapMetric}</Text>
        <Button
          title={"YARDS"}
          style={styles.button}
          onPress={() => this.onSelection("yd")}
        />
        <Button
          title={"MILES"}
          style={styles.button}
          onPress={() => this.onSelection("mi")}
        />
        <Button
          title={"METERS"}
          style={styles.button}
          onPress={() => this.onSelection("m")}
        />
        <Button
          title={"KILOMETERS"}
          style={styles.button}
          onPress={() => this.onSelection("km")}
        />
        <Button
          title="select athletes ->"
          disabled={this.state.disableNextButton}
          onPress={() => this.props.navigation.navigate(`SelectAthletes`, { lapCount: lapCount, lapDistance: lapDistance, lapMetric: this.state.lapMetric })} />
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
  button: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 2,
    fontSize: 50
  },
  distance: {
    fontSize: 80,
    color: 'purple'
  }
});

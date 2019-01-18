import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';

import TimeConversion from '../../utility/time_conversion';
import _ from 'lodash';

// import sharedStyles from '../../styles/sharedStyles';

export default class Timer extends Component {

  // static navigationOptions = {
  //   title: 'Timer',
  // }

  constructor(props) {
    super(props);
    this.state = {
      workoutData: {},
      description: "",
      timerOn: false,
      startTime: 0,
      offset: 0,
      interval: null,
      mainReadout: "0:00.0",
      lapsCompleted: 0,
      athletesArray: []

    }
  }

  componentDidMount() {
    const { lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    // console.log("selectedAthletes", selectedAthletes);
    const sortedAthletes = selectedAthletes.sort();
    // console.log("sortedAthletes", sortedAthletes);
    this.setState({workoutData: {lapCount, lapDistance, lapMetric}},
      () => this.setupTimer(sortedAthletes));
  }

  setupTimer(sortedAthletes) {
    this.createDescription();
    this.createAthletesArray(sortedAthletes);
  }

  createDescription() {
    const date = new Date(Date.now()).toDateString().split(" ");
    const month = date[1];
    const day = date[2];
    console.log("workout data", this.state.workoutData)
    this.setState({ description: `${month} ${day} - ${this.state.workoutData.lapCount} x ${this.state.workoutData.lapDistance}${this.state.workoutData.lapMetric}`})
  }

  createAthletesArray(sortedAthletes) {
    let athletesArray = [];
    for (i = 0; i < sortedAthletes.length; i++) {
      let athleteObj = {
        index: i,
        name: sortedAthletes[i],
        readout: "0:00.0",
        currentLap: 0,
        lapTimesArray: [0],
        workoutDone: false
      };
      athletesArray.push(athleteObj);
    }
    this.setState({athletesArray}, () => console.log("this.state.athletesArray", this.state.athletesArray));
  }



  cancelWorkout() {
    console.log("cancelling workout")
    this.props.navigation.goBack()
  }

  startTimer() {
    const startTime = Date.now();
    this.setState({timerOn: true});
    this.setState({offset: startTime});
    this.setState({startTime}, () => {
      this.setState({interval: setInterval(this.update.bind(this), 10)});
    });

  }

  update() {
    // main readout
    const now = Date.now();
    const timePassed = now - this.state.startTime;
    const mainReadout = TimeConversion(timePassed);
    this.setState({mainReadout});
  }

  recordLap(athleteIndex) {
    if (this.state.timerOn) {
      // console.log("athlete selected:", athleteIndex);
      //update currentLap
      if (!this.state.athletesArray[athleteIndex].workoutDone) {
        const newCurrentLap = this.state.athletesArray[athleteIndex].currentLap + 1;
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === athleteIndex ? Object.assign(obj, {currentLap: newCurrentLap}) : obj)
          )
        }), () => this.checkTotalLaps());

        if (newCurrentLap === this.state.workoutData.lapCount) {
          this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {workoutDone: true}) : obj)
            )
          }));
        }
      }
    }
  }

  checkTotalLaps() {
    const currentLaps = [];
    for (let i = 0; i < this.state.athletesArray.length; i++) {
      currentLaps.push(this.state.athletesArray[i].currentLap)
    }
    // console.log("currentLaps", currentLaps);
    const lowestLap = currentLaps.sort(( a, b ) => a - b )[0];
    this.setState({lapsCompleted: lowestLap});
    if (lowestLap === this.state.workoutData.lapCount) {
      this.stop();
    }
  }

  stop(){
    console.log("workout complete!!!");
    clearInterval(this.state.interval);
  }


  workoutComplete(workoutData) {
    console.log("completed workout")
    this.props.navigation.navigate('ResultsList', { workoutData: this.state.workoutData })
  }

  renderAthleteButtons() {
    return _.map(this.state.athletesArray, athlete => {
      return (
        <TouchableOpacity
          key={athlete.index}
          style={styles.athleteButton}
          onPress={() => this.recordLap(athlete.index)}
        >
          <Text style={styles.athleteName}>{athlete.name}</Text>
          <Text style={styles.athleteReadout}>{athlete.readout}</Text>
          <Text style={styles.athleteLap}>{athlete.currentLap}</Text>
        </TouchableOpacity>
      )
    })
  }

  render(){

    return(
      <View style={styles.container}>
        <Text>{this.state.description}</Text>
        <Button
          title="cancel"
          onPress={() => this.cancelWorkout()} />
        <Button
          title="start"
          onPress={() => this.startTimer()} />
        <Text style={styles.mainReadout}>{this.state.mainReadout}</Text>
        <Text style={styles.lapsCompleted}>{this.state.lapsCompleted}</Text>
        <ScrollView>
          {this.renderAthleteButtons()}
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
    paddingTop: 20
	},
  mainReadout: {
	  fontSize: 40,
    fontWeight: '700',
  },
  lapsCompleted: {
	  fontSize: 60,
    color: 'purple'
  },
  athleteButton: {
	  borderWidth: 2,
    borderColor: 'gray'
  },
  athleteName: {
    fontSize: 25,
    color: 'purple',
  },
  athleteReadout: {
    fontSize: 45,
    // color: 'purple',
  },
  athleteLap: {
	  fontSize: 35,
    color: 'gray',
  },
});
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native';

import TimeConversion from '../../utility/time_conversion';
import StoreUtils from '../../utility/store_utils';

import _ from 'lodash';

// import sharedStyles from '../../styles/sharedStyles';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workoutData: {},
      description: "",
      timerOn: false,
      startTime: 0,
      time: 0,
      interval: null,
      mainReadout: "0:00.0",
      lapsCompleted: 0,
      athletesArray: []
    }
  }

  componentDidMount() {
    const { lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    const sortedAthletes = selectedAthletes.sort();
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
    const day = date[2].charAt(0) === "0" ? date[2].charAt(1) : date[2];
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
        workoutDone: false,
        elapsed: 0,
      };
      athletesArray.push(athleteObj);
    }
    this.setState({athletesArray});
  }

  cancelWorkout() {
    console.log("cancelling workout")
    this.props.navigation.goBack()
  }

  startTimer() {
    const startTime = Date.now();
    this.setState({timerOn: true});
    this.setState({startTime}, () => {
      this.setState({interval: setInterval(this.update.bind(this), 10)});
    });

  }

  update() {
    const now = Date.now();
    const time = now - this.state.startTime;
    this.setState({time});
    const mainReadout = TimeConversion(time);
    this.setState({mainReadout});

    for (i = 0; i < this.state.athletesArray.length; i++) {
      if (!this.state.athletesArray[i].workoutDone) {
        const newLapTime = time - this.state.athletesArray[i].elapsed;
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === i ? Object.assign(obj, {readout: TimeConversion(newLapTime)}) : obj)
          )
        }));
      }
    }
  }

  recordLap(athleteIndex) {
    if (this.state.timerOn) {
      if (!this.state.athletesArray[athleteIndex].workoutDone) {
        const thisLap = Date.now() - this.state.startTime;
        let newLapArray = this.state.athletesArray[athleteIndex].lapTimesArray
        newLapArray.push(thisLap);
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === athleteIndex ? Object.assign(obj, {lapTimesArray: newLapArray}) : obj)
          )
        }), () => this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {elapsed: thisLap}) : obj)
           )
          }))
        );

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
          }), () => this.setState(prevState => ({
              athletesArray: prevState.athletesArray.map(
                obj => (obj.index === athleteIndex ? Object.assign(obj, {readout: 'done'}) : obj)
              )
            }))
          )
        };
      }
    }
  }

  checkTotalLaps() {
    const currentLaps = [];
    for (let i = 0; i < this.state.athletesArray.length; i++) {
      currentLaps.push(this.state.athletesArray[i].currentLap)
    }
    const lowestLap = currentLaps.sort(( a, b ) => a - b )[0];
    this.setState({lapsCompleted: lowestLap});
    if (lowestLap === this.state.workoutData.lapCount) {
      this.stop();
    }
  }

  stop(){
    clearInterval(this.state.interval);
    this.saveWorkout();
  }

  saveWorkout() {
    let workoutArray = [];
    this.state.athletesArray.forEach(athlete => {
      let newAthObj = {
        athlete: athlete.name,
        laps: this.convertLapTimes(athlete.lapTimesArray)
      }
      workoutArray.push(newAthObj);
    })
    let newSaveObj = {
      [this.state.startTime]: {
        id: this.state.startTime,
        description: this.state.description,
        workout: workoutArray
      }
    }
    StoreUtils.mergeStore('WorkoutStore', newSaveObj)
      .then(() => {
        this.props.navigation.navigate('ResultsList', { workoutData: this.state.workoutData }) // TODO: are the params needed?
      })
  }

  convertLapTimes(arr) {
    const trueArray = [];
    for (let i = 0; i < arr.length - 1; i++) {
      trueArray.push(arr[i + 1] - arr[i]);
    }
    return trueArray;
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
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
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
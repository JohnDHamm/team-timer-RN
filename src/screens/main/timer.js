import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image} from 'react-native'
import PieChart from 'react-native-pie-chart';

import StoreUtils from '../../utility/store_utils';
import Utils from '../../utility/utils';

import _ from 'lodash';

import IMAGES from '@assets/images';
import sharedStyles from '../../styles/shared_styles';

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
      mainReadout: {
        main: "0:00",
        decimal: "0",
      },
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
        readout: {
          main: "0:00",
          decimal: "0"
        },
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
    const mainReadout = Utils.createDisplayTime(time);
    this.setState({mainReadout});

    for (i = 0; i < this.state.athletesArray.length; i++) {
      if (!this.state.athletesArray[i].workoutDone) {
        const newLapTime = time - this.state.athletesArray[i].elapsed;
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === i ? Object.assign(obj, {readout: Utils.createDisplayTime(newLapTime)}) : obj)
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
                obj => (obj.index === athleteIndex ? Object.assign(obj, {readout: {main: 'done', decimal: ''}}) : obj)
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
      if (!athlete.workoutDone) {
        return (
          <TouchableOpacity
            key={athlete.index}
            style={styles.athleteButton}
            onPress={() => this.recordLap(athlete.index)}
          >
            <Text style={styles.athleteName}>{athlete.name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 5}}>
                <Text style={styles.lapLabel}>lap: </Text>
                <Text style={styles.lapNum}>{athlete.currentLap + 1}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.athleteReadoutMain}>{athlete.readout.main}.</Text>
                <View style={{width: 35, alignItems: 'flex-start'}}>
                  <Text style={styles.athleteReadoutDecimal}>{athlete.readout.decimal}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      } else {
        return null;
      }
    })
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          {!this.state.timerOn ?
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', paddingLeft: 8, paddingTop: 10, marginRight: 30}}
                onPress={() => this.cancelWorkout()}
                >
                <Image
                  style={styles.backArrow}
                  source={IMAGES.ARROW_BACK_IOS}
                />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch', paddingRight: 20}}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => this.startTimer()}
                >
                  <Image
                    source={IMAGES.STOPWATCH_SM}
                    style={styles.startBtnIcon}
                  />
                  <Text style={styles.startBtnLabel}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          :
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
              <View>
                <PieChart
                  chart_wh={74}
                  series={[this.state.lapsCompleted, this.state.workoutData.lapCount - this.state.lapsCompleted]}
                  sliceColor={[sharedStyles.COLOR_GREEN, sharedStyles.COLOR_PURPLE]}
                  doughnut={true}
                  coverRadius={0.9}
                  coverFill={sharedStyles.COLOR_DARK_BLUE}
                />
                <View style={styles.lapNumBlock}>
                  <Text style={styles.lapsCompleted}>{this.state.lapsCompleted}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.description}>{this.state.description}</Text>
                <Text style={styles.mainReadoutMain}>{this.state.mainReadout.main}</Text>
              </View>
              <TouchableOpacity
                style={styles.stopBtn}
                onPress={() => this.cancelWorkout()}>
                <Image
                  style={styles.stopBtn}
                  source={IMAGES.OUTLINE_CANCEL_SM}/>
              </TouchableOpacity>
            </View>
          }
        </View>

        <View style={{flex: 1, backgroundColor: sharedStyles.COLOR_GREEN}}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {this.renderAthleteButtons()}
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  topContainer: {
    height: 100
  },
  backArrow: {
    width: 13,
    height: 13 / IMAGES.ARROW_BACK_IOS_ASPECT,
    tintColor: sharedStyles.COLOR_LIGHT_BLUE,
    marginRight: 6
  },
  cancelText: {
	  color: sharedStyles.COLOR_LIGHT_BLUE,
    fontSize: 16,
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_GREEN,
    borderRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  startBtnIcon: {
    width: 35,
    height: 35 / IMAGES.STOPWATCH_ASPECT,
    marginRight: 10,
    tintColor: sharedStyles.COLOR_PURPLE
  },
  startBtnLabel: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 40,
    color: sharedStyles.COLOR_PURPLE
  },
  lapCounter: {
	  width: 74,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37,
    borderWidth: 5,
    borderColor: sharedStyles.COLOR_PURPLE
  },
  lapNumBlock: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
    height: 74,
    top: 0,
    left: 0
  },
  lapsCompleted: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 40,
    color: sharedStyles.COLOR_GREEN
  },
  description: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 20,
    color: sharedStyles.COLOR_GREEN
  },
  mainReadoutMain: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    color: sharedStyles.COLOR_GREEN,
	  fontSize: 60,
  },
  stopBtn: {
	  width: 40,
    height: 40,
	  tintColor: sharedStyles.COLOR_RED
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  athleteButton: {
	  borderRadius: 5,
    backgroundColor: sharedStyles.COLOR_WHITE,
    paddingLeft: 15,
    marginVertical: 10,
  },
  athleteName: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
    color: sharedStyles.COLOR_DARK_BLUE,
  },
  athleteReadoutMain: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 45,
    color: sharedStyles.COLOR_PURPLE
  },
  athleteReadoutDecimal: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 3
  },
  lapLabel: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 30,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  lapNum: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 30,
    color: sharedStyles.COLOR_PURPLE
  }


});

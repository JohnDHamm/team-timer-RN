import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal} from 'react-native';

import _ from 'lodash';
import Utils from '../../utility/utils'
import IMAGES from '@assets/images'

import Separator from '../../components/separator';
import SecondaryButton from '../../components/secondary_button';

import sharedStyles from '../../styles/shared_styles';
import StoreUtils from '../../utility/store_utils'
import AdModal from "../../components/ad_modal";

const resultsWidth = sharedStyles.DEVICE_WIDTH * 0.5;

export default class WorkoutDetail extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('headerTitle', 'Result detail')
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedWorkout: {},
      workoutStore: {},
      showAdModal: false
    }
  }

  componentDidMount() {
    const { selectedWorkout, workoutStore } = this.props.navigation.state.params;
    // console.log("selected workout: ", selectedWorkout);
    this.setState({ selectedWorkout, workoutStore });

    const resultsCount = Object.keys(workoutStore).length;
    if (resultsCount === 1 || resultsCount % 3 === 0 ) {
      this.setState({showAdModal: true})
    }
  }

  deleteConfirm() {
    Alert.alert(
      'Warning!',
      'There\'s no going back to this workout...',
      [
        {text: 'Cancel', onPress: () => console.log('cancel deletion'), style: 'cancel'},
        {text: 'Delete', onPress: () => this.deleteResult()}
      ]
    )
  }

  deleteResult() {
    // console.log("delete result:", this.state.selectedWorkout.id);
    let updatedWorkoutStore = this.state.workoutStore;
    delete updatedWorkoutStore[this.state.selectedWorkout.id];

    StoreUtils.setStore('WorkoutStore', updatedWorkoutStore)
      .then(() => {
        this.props.navigation.navigate('ResultsList');
      })
  }

  renderLaps(lapsArray) {
    return _.map(lapsArray, (lapTime, index) => {
      const displayTime = Utils.createDisplayTime(lapTime)

      return (
        <View key={lapTime} style={styles.lapRow}>
          <Text style={styles.lapNum}>lap {index + 1}:</Text>
          <View style={styles.timeBox}>
            <Text style={styles.lapTime}>{displayTime.main}.</Text>
            <Text style={styles.lapTimeDecimal}>{displayTime.decimal}</Text>
          </View>
        </View>
      )
    })
  }

  renderSummary(lapsArray) {
    const totalTimeMS = lapsArray.reduce((a, b) => a + b),
      totalTime = Utils.createDisplayTime(totalTimeMS),
      lapAvg = Utils.createDisplayTime(Math.floor(totalTimeMS / lapsArray.length))

    return (
      <View>
        <View style={styles.lapRow}>
          <Text style={styles.lapNum}>total:</Text>
          <View style={styles.timeBox}>
            <Text style={styles.totalTime}>{totalTime.main}.</Text>
            <Text style={styles.totalTimeDecimal}>{totalTime.decimal}</Text>
          </View>
        </View>
        <View style={styles.lapRow}>
          <Text style={styles.lapNum}>avg:</Text>
          <View style={styles.timeBox}>
            <Text style={styles.lapTime}>{lapAvg.main}.</Text>
            <Text style={styles.lapTimeDecimal}>{lapAvg.decimal}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderAthletes() {
    if (!this.state.selectedWorkout.workout) return;

    return _.map(this.state.selectedWorkout.workout, athlete => {
      // console.log("athlete", athlete.athlete)
      return (
        <View key={athlete.athlete}>
          <View style={styles.nameBlock}>
            <Text style={styles.athleteName}>{athlete.athlete}</Text>
          </View>
          <View style={styles.resultsBlock}>
            <View style={styles.lapsBlock}>
              { this.renderLaps(athlete.laps) }
            </View>
            <Separator
              width={resultsWidth}
              color={sharedStyles.COLOR_GREEN}/>
            <View style={styles.lapsBlock}>
              { this.renderSummary(athlete.laps) }
            </View>
          </View>
        </View>
      )
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          { this.renderAthletes() }
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => this.deleteConfirm()}>
            <SecondaryButton
              label={'delete result'}
              color={sharedStyles.COLOR_PURPLE}
            />
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={this.state.showAdModal}
          animationType='slide'
          transparent={false}
          onRequestClose={() => this.setState({showAdModal: false})}
        >
          <AdModal
            topText='…displays pace information in your workout details…'
            middleImg={IMAGES.TTPRO_AD_RESULT}
            bottomText='…and lets you share the results for use in any spreadsheet!'
            closeModal={() => this.setState({showAdModal: false})}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignSelf: 'stretch'
	},
  description: {
	  color: 'purple',
    fontSize: 20,
    padding: 10
  },
  nameBlock: {
	  backgroundColor: sharedStyles.COLOR_GREEN,
    paddingBottom: 5,
  },
  resultsBlock: {
	  justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  athleteName: {
    textAlign: 'center',
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 40,
    color: sharedStyles.COLOR_PURPLE
  },
  lapsBlock: {
	  width: resultsWidth,
    paddingBottom: 5,
  },
  lapRow: {
	  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  lapNum: {
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 25,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  timeBox: {
	  flexDirection: 'row',
    alignItems: 'flex-end'
	},
  lapTime: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 30,
    color: sharedStyles.COLOR_PURPLE
  },
  lapTimeDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 23,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 2,
  },
  totalTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  totalTimeDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 23,
    color: sharedStyles.COLOR_DARK_BLUE,
    paddingBottom: 2,
  },
  avgTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_GREEN
  },
  deleteBtn: {
	  justifyContent: 'center',
    alignItems: 'center',
	  paddingVertical: 20
  }

});

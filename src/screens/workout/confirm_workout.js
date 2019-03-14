import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import _ from 'lodash';

import IMAGES from '@assets/images';
import sharedStyles from '../../styles/shared_styles';
import Separator from '../../components/separator';
import SecondaryButton from '../../components/secondary_button';

export default class ConfirmWorkout extends Component {

  static navigationOptions = {
    title: 'Confirm workout',
    headerBackTitle: 'Confirm',
  };

  constructor(props) {
    super(props);
    this.state = {
      startButtonLabel: "START WORKOUT"
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
      <View style={sharedStyles.LAYOUT_MAIN_CENTER}>
        <View style={styles.detailsContainer}>
          <View style={[styles.detailsRow, {marginBottom: 15}]}>
            <Text style={styles.detailsLight}>Laps: </Text>
            <Text style={styles.detailsBold}>{lapCount}</Text>
            <Text style={styles.detailsLight}> x </Text>
            <Text style={styles.detailsBold}>{lapDistance}{lapMetric}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsBold}>{selectedAthletes.length}</Text>
            <Text style={styles.detailsLight}> athletes:</Text>
          </View>
          <Separator
            width={sharedStyles.DEVICE_WIDTH * 0.55}
            color={sharedStyles.COLOR_GREEN}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {this.renderAthletes(selectedAthletes)}
          </ScrollView>
        </View>

        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => this.startWorkout()}
          >
            <Image
              source={IMAGES.STOPWATCH_SM}
              style={styles.startBtnIcon}
              />
            <Text style={styles.startBtnLabel}>LET'S DO IT!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            onPress={() => this.resetWorkout()}>
            <SecondaryButton
              label={'reset workout'}
              color={sharedStyles.COLOR_PURPLE}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: .7,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsLight: {
    fontSize: 35,
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  detailsBold: {
    fontSize: 40,
    fontFamily: sharedStyles.FONT_PRIMARY_SEMIBOLD,
    color: sharedStyles.COLOR_PURPLE
  },
  athleteName: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 30,
    color: sharedStyles.COLOR_PURPLE,
  },
  startButtonContainer: {
    flex: .2,
    justifyContent: 'center'
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_GREEN,
    borderRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  startBtnIcon: {
    width: 35,
    height: 35 / IMAGES.STOPWATCH_ASPECT,
    marginRight: 10,
    tintColor: sharedStyles.COLOR_PURPLE
  },
  startBtnLabel: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 25,
    color: sharedStyles.COLOR_PURPLE
  },
  resetButtonContainer: {
    flex: .1,
    justifyContent: 'center'
  },
});

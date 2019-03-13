import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'

import _ from 'lodash';

import Utils from '../../utility/utils'
import StoreUtils from '../../utility/store_utils'

import sharedStyles from '../../styles/shared_styles';
import NextButton from '../../components/next_button';
import EmptyTeam from '../../components/empty_team';

export default class SelectAthletes extends Component {

  static navigationOptions = {
    title: 'Who is participating?',
    headerBackTitle: 'Athletes',
  }

  constructor(props) {
    super(props);
    this.state = {
      teamList: [],
      selectedAthletes: [],
      showEmptyMessage: true,
      disableNextButton: true
    }
  }

  componentDidMount() {
  }

  getAthletes() {
    console.log("onWillFocus - getAthletes")
    StoreUtils.getStore('TeamStore')
      .then(teamStore => {
        if (teamStore !== null) {
          this.setState({teamList: Utils.createTeamList(teamStore), showEmptyMessage: false})
        }
      });
  }


  renderTeamList() {
    if (!this.state.teamList) return;

    return _.map(this.state.teamList, athlete => {
      const selected = this.checkSelected(athlete.name);
      return (
        <TouchableOpacity
          style={styles.athleteSelect}
          key={athlete.name}
          onPress={() => this.toggleAthlete(athlete.name)}
        >
          <View style={[
            styles.radio,
            selected ? styles.radioSelected : styles.radioUnselected]}
          />
          <Text style={selected ? styles.athleteName : styles.athleteNameUnselected}>{athlete.name}</Text>
        </TouchableOpacity>
      );
    })
  }

  checkSelected(name) {
    return this.state.selectedAthletes.includes(name);
  }

  toggleAthlete(athleteName) {
    let updatedSelectedAthletes = this.state.selectedAthletes;
    if (updatedSelectedAthletes.includes(athleteName)) {
      this.setState({ selectedAthletes: updatedSelectedAthletes.filter(name => name !== athleteName ) }, () => {
        if (this.state.selectedAthletes.length < 1) {
          this.setState({disableNextButton: true})
        }
      });
    } else {
      updatedSelectedAthletes.push(athleteName);
      this.setState({ selectedAthletes: updatedSelectedAthletes, disableNextButton: false });
    }
  }


  render(){
    const { lapCount, lapDistance, lapMetric } = this.props.navigation.state.params;

    return(
      <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
        <NavigationEvents
          onWillFocus={() => this.getAthletes()}
        />
        {this.state.showEmptyMessage ?
            <EmptyTeam />
          :
            <View style={{flex: 1}}>
              <ScrollView style={{flex: 0.9}}>
                {this.renderTeamList()}
              </ScrollView>
              <View style={[{flex: 0.1}, sharedStyles.LAYOUT_NEXT_BUTTON_CONTAINER]}>
                <NextButton
                  label={'confirm workout'}
                  disabled={this.state.disableNextButton}
                  onPress={() => this.props.navigation.navigate(`ConfirmWorkout`, {
                    lapCount,
                    lapDistance,
                    lapMetric,
                    selectedAthletes: this.state.selectedAthletes
                  })}/>
              </View>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    marginTop: 30
	},
  athleteSelect: {
	  marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  radioSelected: {
    borderWidth: 6,
    borderColor: sharedStyles.COLOR_GREEN,
    backgroundColor: sharedStyles.COLOR_PURPLE
  },
  radioUnselected: {
    borderWidth: 1,
    borderColor: sharedStyles.COLOR_LIGHT_GRAY,
  },
  athleteName: {
    fontSize: 40,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    color: sharedStyles.COLOR_GREEN
  },
  athleteNameUnselected: {
	  fontSize: 40,
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    color: sharedStyles.COLOR_LIGHT_GRAY
  },
  emptyTeam: {
	  fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    color: sharedStyles.COLOR_RED,
    fontSize: 20,
    textAlign: 'center',
  }
});

import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'

import _ from 'lodash';

import Utils from '../../utility/utils'
import StoreUtils from '../../utility/store_utils'

// import sharedStyles from '../../styles/sharedStyles';

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
          key={athlete.name}
          onPress={() => this.toggleAthlete(athlete.name)}
        >
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
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getAthletes()}
        />
        {this.state.showEmptyMessage &&
          <Text>no current athletes</Text>
        }
        {!this.state.showEmptyMessage &&
          <View>
            <ScrollView>
              {this.renderTeamList()}
            </ScrollView>
            <Button
              title="confirm workout details ->"
              disabled={this.state.disableNextButton}
              onPress={() => this.props.navigation.navigate(`ConfirmWorkout`, {
                lapCount,
                lapDistance,
                lapMetric,
                selectedAthletes: this.state.selectedAthletes
              })}/>
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
  athleteName: {
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'purple'
  },
  athleteNameUnselected: {
	  fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'gray'
  }
});

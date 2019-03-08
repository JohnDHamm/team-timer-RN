import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'

import _ from 'lodash';

import Utils from '../../utility/utils';
import StoreUtils from '../../utility/store_utils';

// import sharedStyles from '../../styles/sharedStyles';

export default class TeamList extends Component {

  static navigationOptions = {
    title: 'Team',
    headerBackTitle: 'Team',
  }

  constructor(props) {
    super(props);
    this.state = {
      showEmptyMessage: true,
      teamStore: {},
      teamList: []
    }
  };

  componentDidMount() {
    StoreUtils.getStore('TeamStore')
      .then(teamStore => {
        // console.log("teamStore", teamStore);
        if (teamStore !== null) {
          this.setState({teamStore}, () => {
            this.setState({teamList: Utils.createTeamList(teamStore), showEmptyMessage: false})
          });
        }
      });
  }

  deleteAthlete(name) {
    // console.log("selected ", name, " to delete");
    // console.log("this.state.teamStore", this.state.teamStore)
    let updatedTeamStore = this.state.teamStore;
    delete updatedTeamStore[name];
    // console.log("updatedTeamStore", updatedTeamStore);
    StoreUtils.setStore('TeamStore', updatedTeamStore)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TeamList' })],
        });
        this.props.navigation.dispatch(resetAction);
      })
  }

  renderTeamList() {
    return _.map(this.state.teamList, athlete => {
      return (
        <TouchableOpacity
          key={athlete.name}
          onLongPress={() => this.deleteAthlete(athlete.name)}>
          <Text style={styles.athleteName}>{athlete.name}</Text>
        </TouchableOpacity>
      );
    })
  }

  // THIS IS TEMPORARY TO CHECK EMPTY TEAM MESSAGE
  deleteAllAthletes() {
    if (this.state.teamList.length > 0) {
      StoreUtils.removeStore('TeamStore')
        .then(() => {
          // console.log("removed all athletes");
          this.setState({teamList: [], showEmptyMessage: true})
        })
    }
  }


  render(){

    return(
      <View style={styles.container}>
        <ScrollView>
          { this.state.showEmptyMessage &&
          <Text>no current athletes</Text>
          }
          {this.renderTeamList()}
        </ScrollView>
        <Button title="DELETE ALL" onPress={() => this.deleteAllAthletes()}/>
        <Button
          title="ADD NEW ATHLETE"
          onPress={() => this.props.navigation.navigate(`AthleteEntry`, { teamStore: this.state.teamStore})} />
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
  athleteName: {
    color: 'purple',
    fontSize: 40
  }
});

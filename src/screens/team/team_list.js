import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'

import _ from 'lodash';

import Utils from '../../utility/utils';
import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles';
import SecondaryButton from '../../components/secondary_button'

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
          this.setState({teamList: [], teamStore: {}, showEmptyMessage: true})
        })
    }
  }


  render(){

    return(
      <View style={sharedStyles.LAYOUT_MAIN_CENTER}>
        <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          { this.state.showEmptyMessage &&
            <Text>no current athletes</Text>
          }
          {this.renderTeamList()}
        </ScrollView>
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(`AthleteEntry`, { teamStore: this.state.teamStore})}>
            <SecondaryButton
              label={'add an athlete'}
              color={sharedStyles.COLOR_PURPLE}/>
          </TouchableOpacity>
        </View>
        {/*<Button title="DELETE ALL" onPress={() => this.deleteAllAthletes()}/>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 0.85,
		justifyContent: 'center',
		alignItems: 'center',
	},
  addBtnContainer: {
	  flex: 0.15,
		justifyContent: 'center',
		alignItems: 'center',
  },
  contentContainer: {
	  paddingBottom: 20,
  },
  athleteName: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    color: sharedStyles.COLOR_PURPLE,
    fontSize: 40
  }
});

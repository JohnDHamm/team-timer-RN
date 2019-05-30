import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'

import _ from 'lodash';

import Utils from '../../utility/utils';
import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles';
import SecondaryButton from '../../components/secondary_button';
import EmptyTeam from '../../components/empty_team';

export default class TeamList extends Component {

  static navigationOptions = {
    title: 'Team',
    headerBackTitle: 'Cancel',
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
        if (!_.isEmpty(teamStore)) {
          this.setState({teamStore}, () => {
            this.setState({teamList: Utils.createTeamList(teamStore), showEmptyMessage: false})
          });
        }
      });
  }

  renderTeamList() {
    return _.map(this.state.teamList, athlete => {
      return (
        <TouchableOpacity
          key={athlete.name}
          style={styles.athleteBtn}
          onPress={() => this.props.navigation.navigate('EditAthlete', {teamStore: this.state.teamStore, currentName: athlete.name})}
          >
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
          { this.state.showEmptyMessage ?
            <EmptyTeam />
          :
            <ScrollView contentContainerStyle={styles.contentContainer}>
              {this.renderTeamList()}
            </ScrollView>
          }
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
  athleteBtn: {
	  paddingHorizontal: 20,
	  marginBottom: 10,
  },
  athleteName: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    color: sharedStyles.COLOR_PURPLE,
    fontSize: 40
  }
});

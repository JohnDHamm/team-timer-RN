import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native'

import _ from 'lodash';

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
    AsyncStorage.getItem('TeamStore')
      .then(response => {
        // console.log("teamStore", JSON.parse(response));
        if (response !== null) {
          this.setState({ teamStore: JSON.parse(response) }, () => {
            this.setState({showEmptyMessage: false}, () => this.createTeamList())
          });
        }
      });
  }

  createTeamList() {
    const teamList = _.sortBy(_.map(this.state.teamStore), 'name');
    // console.log("teamList", teamList);
    this.setState({ teamList });
  }

  renderTeamList() {
    return _.map(this.state.teamList, athlete => {
      return (
        <TouchableOpacity
          key={athlete.name}
          onLongPress={() => {
            console.log("selected ", athlete.name, " to delete")
          }}>
          <Text style={styles.athleteName}>{athlete.name}</Text>
        </TouchableOpacity>
      );
    })
  }

  // THIS IS TEMPORARY TO CHECK EMPTY TEAM MESSAGE
  deleteAllAthletes() {
    AsyncStorage.removeItem('TeamStore', () => console.log("removed all athletes"));
    //if keeping this, add a stack reset
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

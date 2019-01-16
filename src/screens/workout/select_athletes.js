import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import _ from 'lodash';
// import sharedStyles from '../../styles/sharedStyles';

export default class SelectAthletes extends Component {

  static navigationOptions = {
    title: 'Who is participating?',
    headerBackTitle: 'Athletes',
  }

  constructor(props) {
    super(props);
    this.state = {
      team: [],
      teamList: [],
      selectedAthleteIDs: []
    }
  }

  componentDidMount() {
    //get team list from AsyncStorage
    const mockTeam = [{ name: 'Lucy', id: 1 }, { name: 'Makenna', id: 2 }, { name: 'Bob', id: 3 }];
    //check for empty team?
    this.setState({team: mockTeam}, () => this.orderTeamList(this.state.team));
  }

  orderTeamList(team) {
    // console.log("team", team);
    //create alphabetical ordered list for display
    this.setState({teamList: this.state.team}); //temp
  }

  createTeamList() {
    return _.map(this.state.teamList, athlete => {
      const selected = this.checkSelected(athlete);
      return (
        <TouchableOpacity
          key={athlete.id}
          onPress={() => this.toggleAthlete(athlete.id)}
        >
          <Text style={selected ? styles.athleteName : styles.athleteNameUnselected}>{athlete.name}</Text>
        </TouchableOpacity>
      );
    })
  }

  checkSelected(athlete) {
    return this.state.selectedAthleteIDs.includes(athlete.id);
  }

  toggleAthlete(athleteId) {
    let updatedSelectedAthletes = this.state.selectedAthleteIDs;
    if (updatedSelectedAthletes.includes(athleteId)) {
      this.setState({ selectedAthleteIDs: updatedSelectedAthletes.filter(id => id !== athleteId ) }, () => console.log("now selected:", this.state.selectedAthleteIDs));
    } else {
      updatedSelectedAthletes.push(athleteId);
      this.setState({ selectedAthleteIDs: updatedSelectedAthletes }, () => console.log("now selected:", this.state.selectedAthleteIDs));
    }
  }

  render(){
    const { lapCount, lapDistance, lapMetric } = this.props.navigation.state.params;
    // console.log("lapCount", lapCount);
    // console.log("lapDistance", lapDistance);
    // console.log("lapMetric", lapMetric);

    return(
      <View style={styles.container}>
        <ScrollView>
          {this.createTeamList()}
        </ScrollView>
        <Button
          title="start workout"
          onPress={() => this.props.navigation.navigate(`Timer`, { lapCount: lapCount, lapDistance: lapDistance, lapMetric: lapMetric, athleteIDs: this.state.selectedAthleteIDs })} />
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

import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'

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
      // team: [],
      teamList: [],
      selectedAthletes: [],
      showEmptyMessage: true,
    }
  }

  componentDidMount() {
    //get team list from AsyncStorage
    AsyncStorage.getItem('TeamStore')
      .then(response => {
        if (response !== null) {
          this.setState({showEmptyMessage: false}, () => this.createTeamList(JSON.parse(response)))
        }
      });
  }

  createTeamList(team) {
    // create alphabetical ordered list for display
    // console.log("team from store:", team);
    const teamList = _.map(team, 'name');
    this.setState({teamList: teamList.sort()}); //temp
  }

  renderTeamList() {
    if (!this.state.teamList) return;

    return _.map(this.state.teamList, name => {
      const selected = this.checkSelected(name);
      return (
        <TouchableOpacity
          key={name}
          onPress={() => this.toggleAthlete(name)}
        >
          <Text style={selected ? styles.athleteName : styles.athleteNameUnselected}>{name}</Text>
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
      this.setState({ selectedAthletes: updatedSelectedAthletes.filter(name => name !== athleteName ) });
    } else {
      updatedSelectedAthletes.push(athleteName);
      this.setState({ selectedAthletes: updatedSelectedAthletes });
    }
  }


  render(){
    const { lapCount, lapDistance, lapMetric } = this.props.navigation.state.params;

    return(
      <View style={styles.container}>
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

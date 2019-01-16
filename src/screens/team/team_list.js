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
      team: [],
      teamList: []
    }
  };

  componentDidMount() {
    AsyncStorage.getItem('TeamStore')
      .then(response => {
        // console.log("teamStore", JSON.parse(response));
        if (response !== null) {
          this.setState({ team: JSON.parse(response) }, () => {
            this.setState({showEmptyMessage: false}, () => this.createTeamList())
          });
        }
      });
  }

  createTeamList() {
    let teamList = [];
    // console.log(this.state.team);
    this.state.team.forEach(athlete => teamList.push(athlete.name));
    // console.log("teamList", teamList.sort());
    this.setState({ teamList: teamList.sort() });
  }

  renderTeamList() {
    return _.map(this.state.teamList, name => {
      return (
        <Text
          key={name}
          style={styles.athleteName}
        >
          {name}
        </Text>
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
          onPress={() => this.props.navigation.navigate(`AthleteEntry`, { team: this.state.team})} />
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

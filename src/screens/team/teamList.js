import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class TeamList extends Component {

  static navigationOptions = {
    title: 'Team List',
    headerBackTitle: 'Team',
  }

  render(){
    // const { workoutData, timer } = this.props.navigation.state.params;
    // console.log("workoutData", workoutData);
    // const athletes = [ { name: 'Lucy', id: 1 }, { name: 'Makenna', id: 2 } ];

    return(
      <View>
        <Button
          title="ADD NEW ATHLETE"
          onPress={() => this.props.navigation.navigate(`AthleteEntry`)} />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	}
// });

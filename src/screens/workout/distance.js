import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class Distance extends Component {

  static navigationOptions = {
    title: 'Lap distance',
    headerBackTitle: 'Distance',
  }

  render(){
    // const { workoutData, timer } = this.props.navigation.state.params;
    // console.log("workoutData", workoutData);
    // const athletes = [ { name: 'Lucy', id: 1 }, { name: 'Makenna', id: 2 } ];

    return(
      <View>
        <Button
          title="select athletes ->"
          onPress={() => this.props.navigation.navigate(`SelectAthletes`)} />
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

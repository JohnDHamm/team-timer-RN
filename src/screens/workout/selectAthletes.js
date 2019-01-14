import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class SelectAthletes extends Component {

  static navigationOptions = {
    title: 'Select athletes',
    headerBackTitle: 'Select athletes',
  }

  render(){
    // const { workoutData, timer } = this.props.navigation.state.params;
    // console.log("workoutData", workoutData);
    // const athletes = [ { name: 'Lucy', id: 1 }, { name: 'Makenna', id: 2 } ];

    return(
      <View>
        <Button
          title="start workoout"
          onPress={() => this.props.navigation.navigate(`Timer`)} />
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
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class SelectAthletes extends Component {

  static navigationOptions = {
    title: 'Who is participating?',
    headerBackTitle: 'Athletes',
  }

  render(){
    const { lapCount, lapDistance, lapMetric } = this.props.navigation.state.params;
    console.log("lapCount", lapCount);
    console.log("lapDistance", lapDistance);
    console.log("lapMetric", lapMetric);
    const athletes = [ { name: 'Lucy', id: 1 }, { name: 'Makenna', id: 2 } ];

    return(
      <View style={styles.container}>
        <Button
          title="start workout"
          onPress={() => this.props.navigation.navigate(`Timer`, { lapCount: lapCount, lapDistance: lapDistance, lapMetric: lapMetric, athletes: athletes })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

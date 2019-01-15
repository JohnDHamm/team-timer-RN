import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class Distance extends Component {

  static navigationOptions = {
    title: 'How long is each lap?',
    headerBackTitle: 'Distance',
    // headerTruncatedBackTitle: '-',
  }

  render(){
    const { lapCount } = this.props.navigation.state.params;
    console.log("lapCount", lapCount);

    return(
      <View style={styles.container}>
        <Button
          title="select athletes ->"
          onPress={() => this.props.navigation.navigate(`SelectAthletes`, { lapCount: lapCount, lapDistance: 1000, lapMetric: 'm' })} />
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

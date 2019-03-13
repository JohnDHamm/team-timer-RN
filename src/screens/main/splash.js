import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';

import sharedStyles from '../../styles/shared_styles';

export default class Splash extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'dosis-regular': require('../../../assets/fonts/Dosis-Regular.ttf'),
      'dosis-medium': require('../../../assets/fonts/Dosis-Medium.ttf'),
      'dosis-light': require('../../../assets/fonts/Dosis-Light.ttf'),
      'dosis-semiBold': require('../../../assets/fonts/Dosis-SemiBold.ttf'),
    })
    //TODO: clear navigation history/reset stack to stop user from going back to here with right swipe
    setTimeout(() => this.props.navigation.navigate('MainApp'), 500);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Team Timer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  title: {
    fontWeight: "200",
    color: sharedStyles.COLOR_PURPLE,
    fontSize: 40,
  }
});

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class Splash extends Component {

  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('MainApp'), 2000);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Splash screen</Text>
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

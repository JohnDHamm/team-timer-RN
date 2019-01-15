import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class LapDistance extends Component {

  static navigationOptions = {
    title: 'How long is each lap?',
    headerBackTitle: 'Distance',
    // headerTruncatedBackTitle: '-',
  }

  constructor(props) {
    super(props);
    this.state = {
      lapDistance: null
    }
  };

  render(){
    const { lapCount } = this.props.navigation.state.params;
    console.log("lapCount", lapCount);

    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(lapDistance) => this.setState({lapDistance})}
          value={this.state.lapDistance}
          keyboardType='decimal-pad'
        />
        <Button
          title="select measurement units ->"
          onPress={() => this.props.navigation.navigate(`LapMetric`, { lapCount: lapCount, lapDistance: this.state.lapDistance })} />
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
  textInput: {
	  width: 200,
	  height: 100,
    borderColor: 'gray',
    borderWidth: 2,
    fontSize: 80
  }
});

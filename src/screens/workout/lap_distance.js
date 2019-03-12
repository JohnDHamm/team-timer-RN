import React, { Component } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

import NextButton from '../../components/next_button';

import sharedStyles from '../../styles/shared_styles';

export default class LapDistance extends Component {

  static navigationOptions = {
    title: 'How long is each lap?',
    headerBackTitle: 'Distance',
    // headerTruncatedBackTitle: '-',
  }

  constructor(props) {
    super(props);
    this.state = {
      lapDistance: null,
      disableNextButton: true
    }
  };

  onInputChange(lapDistance) {
    if (lapDistance) {
      this.setState({lapDistance, disableNextButton: false})
    } else {
      this.setState({disableNextButton: true})
    }
  }

  render(){
    const { lapCount } = this.props.navigation.state.params;
    // console.log("lapCount", lapCount);

    return(
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <View style={{flex: 0.5}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(lapDistance) => this.onInputChange(lapDistance)}
            keyboardType='decimal-pad'
            selectionColor={sharedStyles.COLOR_PURPLE}
            maxLength={4}
            autoFocus={true}
          />
        </View>
        <NextButton
          label={'units'}
          disabled={this.state.disableNextButton}
          onPress={() => this.props.navigation.navigate(`LapMetric`, { lapCount: lapCount, lapDistance: this.state.lapDistance })}/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textInput: {
	  width: 200,
	  height: 100,
    fontSize: 100,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  }
});

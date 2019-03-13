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
      <KeyboardAvoidingView style={sharedStyles.LAYOUT_MAIN_CENTER} behavior={'padding'}>
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
        <View style={styles.nextContainer}>
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
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 40,
  },
  textInput: {
	  width: 220,
	  height: 100,
    fontSize: 100,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_SEMIBOLD,
  },
  nextContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  }
});

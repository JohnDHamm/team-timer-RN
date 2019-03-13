import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles'
import SecondaryButton from '../../components/secondary_button'

export default class AthleteEntry extends Component {

  static navigationOptions = {
    title: 'Add an athlete',
  }

  constructor(props) {
    super(props);
    this.state = {
      teamStore: {},
      newName: "",
      showSaveBtn: false,
      showErrMsg: false,
      errMsg: "That name already exists!",
    }
  };

  componentDidMount() {
    const { teamStore } = this.props.navigation.state.params;
    // console.log("existing teamStore", teamStore);
    this.setState({teamStore});
  }

  onChangeText(newName) {
    if (newName) {
      if (this.checkDuplicateAthlete(newName)) {
        this.setState({showErrMsg: true, showSaveBtn: false})
      } else {
        this.setState({showSaveBtn: true, showErrMsg: false, newName})
      }
    } else {
      this.setState({showSaveBtn: false, showErrMsg: false})
    }
  }

  saveAthlete() {
    let updatedTeam = this.state.teamStore;
    const newAthlete = {
      name: this.state.newName
    };
    updatedTeam[this.state.newName] = newAthlete;
    // console.log("updatedTeam", updatedTeam);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    })
    StoreUtils.setStore('TeamStore', updatedTeam)
      .then(() => this.props.navigation.dispatch(resetAction));
  }

  checkDuplicateAthlete(newName) {
    const teamNames = Object.keys(this.state.teamStore);
    const match = teamNames.filter(name => name === newName);
    if (match.length > 0) {
      return true
    };
    return false;
  }


  render(){
    return(
      <KeyboardAvoidingView style={sharedStyles.LAYOUT_MAIN_CENTER} behavior={'padding'}>
        <View style={ styles.topContainer}>
          <View style={ styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(newName) => this.onChangeText(newName)}
              selectionColor={sharedStyles.COLOR_PURPLE}
              maxLength={10}
              autoFocus={true}
            />
          </View>
        </View>
        <View style={ styles.bottomContainer}>
          {this.state.showErrMsg &&
            <Text style={styles.errMsg}>{this.state.errMsg}</Text>
          }
          {this.state.showSaveBtn &&
            <TouchableOpacity
              onPress={() => this.saveAthlete()}>
              <SecondaryButton
                label={'save athlete'}
                color={sharedStyles.COLOR_PURPLE}/>
            </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
	topContainer: {
		flex: 0.5,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textInput: {
    width: 260,
	  height: 80,
    fontSize: 50,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  bottomContainer: {
	  flex: 0.5,
    paddingTop: 20,
  },
  errMsg: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 20,
	  color: sharedStyles.COLOR_RED,
    paddingBottom: 15,
  },
});

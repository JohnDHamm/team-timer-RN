import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles'
import SecondaryButton from '../../components/secondary_button'

export default class EditAthlete extends Component {

  static navigationOptions = {
    title: 'Edit athlete',
  }

  constructor(props) {
    super(props);
    this.state = {
      currentName: "",
      teamStore: {},
      newName: "",
      showSaveBtn: false,
      showDeleteBtn: true,
      showErrMsg: false,
      errMsg: "That name already exists!",
    }
  };

  componentDidMount() {
    const { teamStore, currentName } = this.props.navigation.state.params;
    // console.log("existing teamStore", teamStore);
    this.setState({teamStore, currentName});
  }

  onChangeText(newName) {
    if (newName) { //not empty
      if (newName === this.state.currentName) { //name not changed
        this.setState({showDeleteBtn: true, showSaveBtn: false, showErrMsg: false})
      } else {
        if (this.checkDuplicateAthlete(newName)) { //name changed but already exists
          this.setState({showDeleteBtn: false, showSaveBtn: false, showErrMsg: true})
        } else { //new unique name
          this.setState({newName, showSaveBtn: true, showDeleteBtn: false, showErrMsg: false})
        }
      }
    } else { //empty
      this.setState({showSaveBtn: false, showDeleteBtn: false, showErrMsg: false})
    }
  }

  saveAthlete() {
    let updatedTeamStore = this.state.teamStore;
    delete updatedTeamStore[this.state.currentName];
    const newAthlete = {
      name: this.state.newName
    };
    updatedTeamStore[this.state.newName] = newAthlete;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    })
    StoreUtils.setStore('TeamStore', updatedTeamStore)
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

  deleteAthlete(name) {
    let updatedTeamStore = this.state.teamStore;
    delete updatedTeamStore[name];
    // console.log("updatedTeamStore", updatedTeamStore);
    StoreUtils.setStore('TeamStore', updatedTeamStore)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TeamList' })],
        });
        this.props.navigation.dispatch(resetAction);
      })
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
              defaultValue={this.state.currentName}
            />
          </View>
        </View>
        <View style={ styles.bottomContainer}>
          {this.state.showSaveBtn &&
            <TouchableOpacity
              onPress={() => this.saveAthlete()}>
              <SecondaryButton
                label={'save changes'}
                color={sharedStyles.COLOR_PURPLE}/>
            </TouchableOpacity>
          }
          {this.state.showErrMsg &&
            <Text style={styles.errMsg}>{this.state.errMsg}</Text>
          }
          {this.state.showDeleteBtn &&
            <TouchableOpacity
              onPress={() => this.deleteAthlete(this.state.currentName)}>
              <SecondaryButton
                label={'delete athlete'}
                color={sharedStyles.COLOR_RED}/>
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

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';

// import sharedStyles from '../../styles/sharedStyles';

export default class AthleteEntry extends Component {

  static navigationOptions = {
    title: 'Add an athlete',
  }

  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      showErrMsg: false,
      errMsg: ""
    }
  };

  componentDidMount() {
    // const { teamStore } = this.props.navigation.state.params;
    // console.log("existing teamStore", teamStore);
  }

  saveAthlete() {
    const { teamStore } = this.props.navigation.state.params;
    // console.log("existing teamStore", teamStore);
    if (!this.checkDuplicateAthlete(teamStore)) {
      let updatedTeam = teamStore;

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

    } else {
      this.showErrMsg();
    }
  }

  checkDuplicateAthlete(teamStore) {
    const teamNames = Object.keys(teamStore);
    const match = teamNames.filter(name => name === this.state.newName);
    if (match.length > 0) {
      return true
    };
    return false;
  }

  showErrMsg() {
    // console.log("there is already an athlete with that name!")
    this.setState({showErrMsg: true, errMsg: "That name already exists!"});
  }


  render(){

    return(
      <View style={styles.container}>
        {this.state.showErrMsg &&
          <Text style={styles.errMsg}>{this.state.errMsg}</Text>
        }
        <TextInput
          style={styles.textInput}
          onChangeText={(newName) => this.setState({newName, showErrMsg: false})}
          maxLength={10}
          autoFocus={true}
        />
        <Button
          title="SAVE ATHLETE"
          onPress={() => this.saveAthlete()} />
        <Button
          title="cancel"
          onPress={() => this.props.navigation.goBack()} />
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
  errMsg: {
	  fontSize: 20,
	  color: 'red',
    paddingBottom: 15,
  },
  textInput: {
	  height: 100,
    width: 260,
    borderColor: 'purple',
    borderWidth: 1,
    fontSize: 30,
    color: 'purple'
  }
});

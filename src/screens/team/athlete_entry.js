import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

// import sharedStyles from '../../styles/sharedStyles';

export default class AthleteEntry extends Component {

  static navigationOptions = {
    title: 'Add an athlete',
  }

  constructor(props) {
    super(props);
    this.state = {
      newName: ""
    }
  };

  componentDidMount() {
    const { team } = this.props.navigation.state.params;
    // console.log("existing team", team);
  }

  saveAthlete() {
    //check for name already existing?
    const { team } = this.props.navigation.state.params;
    let updatedTeam = team;

    const newAthlete = {
      name: this.state.newName
    };

    updatedTeam.push(newAthlete);
    // console.log("updatedTeam", updatedTeam);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    })

    AsyncStorage.setItem('TeamStore', JSON.stringify(updatedTeam))
      .then(() => this.props.navigation.dispatch(resetAction));
  }

  render(){

    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(newName) => this.setState({newName})}
          maxLength={10}
          autoFocus={true}
        />
        <Button
          title="SAVE ATHLETE"
          onPress={() => this.saveAthlete()} />
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
	  height: 100,
    width: 260,
    borderColor: 'purple',
    borderWidth: 1,
    fontSize: 30,
    color: 'purple'
  }
});

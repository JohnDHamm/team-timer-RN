import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// import sharedStyles from '../../styles/sharedStyles';

export default class LapCount extends Component {

  static navigationOptions = {
    title: 'How many laps?',
    headerBackTitle: 'Laps',
  };

  constructor(props) {
    super(props);
    this.state = {
      lapCount: 2,
      showEmptyMessage: false
    }
  };

  componentDidMount() {
    //check for empty team
  }

  handleCountChange(direction) {
    let newCount;

    if (direction === "down") {
      if (this.state.lapCount < 2) return;
      newCount = this.state.lapCount - 1;
    } else {
      if (this.state.lapCount > 9) return;
      newCount = this.state.lapCount + 1;
    }

    this.setState({lapCount: newCount});
  }

  render(){

    return(
      <View style={styles.container}>
        {this.state.showEmptyMessage ?
          <Text>no team!</Text>
          : (
            <View>
              <Text style={styles.lapCount}>{this.state.lapCount}</Text>
              <Button
              title = "down"
              onPress={() => this.handleCountChange("down")} />
              <Button
              title="up"
              onPress={() => this.handleCountChange("up")} />
              <Button
              title="distance ->"
              onPress={() => this.props.navigation.navigate(`LapDistance`, {lapCount: this.state.lapCount})} />
            </View>
          )
        }
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
  lapCount: {
	  color: 'purple',
    fontSize: 250
  }
});

import React from 'react';
import { StatusBar } from 'react-native';

import AppContainer from  './src/navigation/appNavigation';

export default class App extends React.Component {

  render() {

    StatusBar.setBarStyle('light-content');

    return (
      <AppContainer />
    );
  }
}

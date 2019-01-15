import React, { Component } from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Routes from './routes';
import Splash from '../screens/main/splash';
import Timer from '../screens/workout/timer';

// import Images from '@assets/images'
// import sharedStyles from '../styles/sharedStyles';

const appHeaderOptions = {
  headerStyle: {
    backgroundColor: '#000',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: '800',
  },
  headerBackTitleStyle: {
    // color: sharedStyles.COLOR_HEADER_GRAY,
    fontSize: 14,
  },
  // headerTintColor: sharedStyles.COLOR_HEADER_GRAY,
}


const TeamStack = createStackNavigator( Routes.TeamRoutes,
  { initialRouteName: 'TeamList',
    navigationOptions: appHeaderOptions,
  }
)

const WorkoutStack = createStackNavigator( Routes.WorkoutRoutes,
  { initialRouteName: 'LapCount',
    navigationOptions: appHeaderOptions,
  }
)

const ResultsStack = createStackNavigator( Routes.ResultsRoutes,
  { initialRouteName: 'ResultsList',
    navigationOptions: appHeaderOptions,
  }
)

const TabNavConfig = {
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: true,
    // inactiveTintColor: '#c1b120',
    // activeTintColor: sharedStyles.COLOR_AERO_YELLOW,
    style: {
      backgroundColor: '#000',
    },
  }
}

const TabNav = createBottomTabNavigator({
  Workout: { screen: WorkoutStack,
    navigationOptions: {
      tabBarLabel: 'Workout'
    }
  },
  Results: { screen: ResultsStack,
    navigationOptions: {
      tabBarLabel: 'Results',
    }
  },
  Team: { screen: TeamStack,
    navigationOptions: {
      tabBarLabel: 'Team'
    }
  }
}, TabNavConfig );


const MainStackConfig = {
  headerMode: 'none'
}

const MainStack = createStackNavigator({
	Splash: { screen: Splash },
	MainApp: { screen: TabNav },
  Timer: { screen: Timer }
 }, MainStackConfig
)

const AppContainer = createAppContainer(MainStack);

export default AppContainer;


const styles = StyleSheet.create({
  tabIcon: {
    width: 32,
    height: 32,
  }
});

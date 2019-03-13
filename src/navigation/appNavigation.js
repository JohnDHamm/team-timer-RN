import React, { Component } from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Routes from './routes';
import Splash from '../screens/main/splash';
import Timer from '../screens/main/timer';

import IMAGES from '@assets/images'
import sharedStyles from '../styles/shared_styles';

const appHeaderOptions = {
  headerStyle: {
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
  },
  headerTitleStyle: {
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 20,
  },
  headerBackTitleStyle: {
    color: sharedStyles.COLOR_LIGHT_BLUE,
    fontSize: 16,
  },
  headerTintColor: sharedStyles.COLOR_LIGHT_BLUE,
}


const TeamStack = createStackNavigator( Routes.TeamRoutes,
  { initialRouteName: 'TeamList',
    defaultNavigationOptions: appHeaderOptions,
  }
)

const WorkoutStack = createStackNavigator( Routes.WorkoutRoutes,
  { initialRouteName: 'LapCount',
    defaultNavigationOptions: appHeaderOptions,
  }
)

const ResultsStack = createStackNavigator( Routes.ResultsRoutes,
  { initialRouteName: 'ResultsList',
    defaultNavigationOptions: appHeaderOptions,
  }
)

const TabNavConfig = {
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: true,
    inactiveTintColor: sharedStyles.COLOR_LIGHT_BLUE,
    activeTintColor: sharedStyles.COLOR_GREEN,
    style: {
      backgroundColor: sharedStyles.COLOR_DARK_BLUE,
    },
  }
}

const TabNav = createBottomTabNavigator({
  Workout: { screen: WorkoutStack,
    navigationOptions: {
      tabBarLabel: 'Workout',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={IMAGES.WORKOUT_TAB_ICON}
          style={[styles.tabIcon, {tintColor: tintColor}]}
        />
      )
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
    width: 26,
    height: 26,
  }
});

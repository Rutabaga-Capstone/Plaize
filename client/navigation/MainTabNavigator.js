import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import CreateAccountScreen from '../screens/CreateAccount'
import SettingsScreen from '../screens/MapScreen'
import SnapScreen from '../screens/SnapScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PlantInfoScreen from '../screens/PlantInfo'
import Colors from '../constants/Colors'

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {}
})

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    CreateAccount: CreateAccountScreen
  },
  config
)

/*---- HOME NAVIGATION -----*/

HomeStack.navigationOptions = {
  tabBarVisible: false,
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.inactiveTintColor
  },
  tabBarIcon: ({activeTintColor}) => (
    <TabBarIcon
      activeTintColor={activeTintColor}
      name="md-person"
      color={Colors.activeTintColor}
    />
  )
}

HomeStack.path = ''

/*----- MAP -----*/

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  )
}

SettingsStack.path = ''

/*----- SNAP -----*/

const SnapStack = createStackNavigator(
  {
    Snap: SnapScreen,
    PlantInfo: PlantInfoScreen
  },
  config
)

SnapStack.navigationOptions = {
  tabBarLabel: 'Snap',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
      color={Colors.activeTintColor}
    />
  )
}

/*----- PROFILE -----*/

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
)

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-person" />
}

const tabNavigator = createBottomTabNavigator(
  {
    ProfileStack,
    SnapStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: '#6CC7BD',
      inactiveTintColor: '#ccc'
    }
  }
)

tabNavigator.path = ''

export default tabNavigator

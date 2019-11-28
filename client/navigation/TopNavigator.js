import React from 'react'
import {Platform} from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import CreateAccountScreen from '../screens/CreateAccount'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/MapScreen'
import SnapScreen from '../screens/SnapScreen'

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {}
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    CreateAccount: CreateAccountScreen
  },
  config
)

HomeStack.navigationOptions = {
  tabBarVisible: false,
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: '#6CC7BD',
    inactiveTintColor: '#CCCCCC'
  },
  tabBarIcon: ({activeTintColor}) => (
    <TabBarIcon
      activeTintColor={activeTintColor}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${activeTintColor ? '' : '-outline'}`
          : 'md-information-circle'
      }
      color={activeTintColor}
    />
  )
}

HomeStack.path = ''

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
)

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

LinksStack.path = ''

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

const SnapStack = createStackNavigator(
  {
    Snap: SnapScreen
  },
  config
)

SnapStack.navigationOptions = {
  tabBarLabel: 'Snap',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    />
  )
}

const tabNavigator = createMaterialTopTabNavigator({
  HomeStack,
  SnapStack,
  SettingsStack
})

tabNavigator.path = ''

export default tabNavigator

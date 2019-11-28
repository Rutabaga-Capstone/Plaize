import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import HomeScreen from './HomeScreen'
import MapScreen from './MapScreen'

const topNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Leaderboard: LeaderboardScreen,
    Map: MapScreen,
    Snap: SnapScreen
  },
  {}
)

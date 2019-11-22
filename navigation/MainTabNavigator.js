import React from "react"
import { Platform } from "react-native"
import {
	createStackNavigator,
	createBottomTabNavigator
} from "react-navigation"

// import Login from "../components/Login"
// import Logout from "../components/Logout"
// import Signup from "../components/Signup"
import HomeScreen from "../screens/HomeScreen"
import LinksScreen from "../screens/LinksScreen"
import SettingsScreen from "../screens/SettingsScreen"
import TabBarIcon from "../components/TabBarIcon"
// import CameraExample from "../screens/CameraFeature"

//import * as ImagePicker from 'expo-image-picker';

const config = Platform.select({
	web: { headerMode: "screen" },
	default: {}
})

/////HOME
const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
)

HomeStack.navigationOptions = {
	tabBarLabel: "Observations",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === "ios"
					? `ios-checkmark-circle${focused ? "" : "-outline"}`
					: "md-checkmark-circle"
			}
		/>
	)
}

HomeStack.path = ""

/////LINKS

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen
	},
	config
)

LinksStack.navigationOptions = {
	tabBarLabel: "Chat",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
		/>
	)
}

LinksStack.path = ""

/////SETTINGS

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen
	},
	config
)

SettingsStack.navigationOptions = {
	tabBarLabel: "Announcements",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-megaphone" : "md-megaphone"}
		/>
	)
}

SettingsStack.path = ""

/////CAMERA
//const CameraFeature = <CameraExample />
// const CameraStack = createStackNavigator(
// 	{
// 		Camera: CameraExample
// 	},
// 	config
// )

// CameraStack.navigationOptions = {
// 	tabBarLabel: "Camera",
// 	tabBarIcon: ({ focused }) => (
// 		<TabBarIcon
// 			focused={focused}
// 			name={Platform.OS === "ios" ? "ios-options" : "md-options"}
// 		/>
// 	)
// }

// CameraStack.path = ""

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	LinksStack,
	SettingsStack
	//ImagePicker,
	//CameraStack
})

tabNavigator.path = ""

export default tabNavigator

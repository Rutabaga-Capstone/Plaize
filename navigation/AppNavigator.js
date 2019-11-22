import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"

import MainTabNavigator from "./MainTabNavigator"
//import AuthSplash from "./AuthSplash"
//import AuthLoadingScreen from "../screens/AuthLoadingScreen"

export default createAppContainer(
	createSwitchNavigator({
		// You could add another route here for authentication.
		// Read more at https://reactnavigation.org/docs/en/auth-flow.html
		Main: MainTabNavigator
		//Auth: AuthSplash
	})
)

// export default createAppContainer(
// 	createSwitchNavigator(
// 		{
// 			AuthLoading: AuthLoadingScreen,
// 			App: AppStack,
// 			Auth: AuthStack,
// 			Main: MainTabNavigator
// 		},
// 		{
// 			initialRouteName: "AuthLoading"
// 		}
// 	)
// )

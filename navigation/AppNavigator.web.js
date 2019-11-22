import { createBrowserApp } from "@react-navigation/web"
import { createSwitchNavigator, createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import MainTabNavigator from "./MainTabNavigator"

// const switchNavigator = createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// });
// switchNavigator.path = '';

// export default createBrowserApp(switchNavigator, { history: 'hash' });

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: AppStack,
			Auth: AuthStack
			// Main: MainTabNavigator
		},
		{
			initialRouteName: "AuthLoading"
		}
	)
)

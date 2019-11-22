import React from "react"
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button
} from "react-native"
import { users } from "../seed"

export default class AllUsersTable extends React.Component {
	renderRow(user) {
		return (
			<View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
				<View style={{ flex: 1, alignSelf: "stretch" }} />
				<Text>{user.name}</Text>
				{/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
				<View style={{ flex: 1, alignSelf: "stretch" }} />
				<Text>{user.gradeLevels}</Text>
				<View style={{ flex: 1, alignSelf: "stretch" }} />
				<Text>{user.courses}</Text>
				{/* <View style={{ flex: 1, alignSelf: "stretch" }} />
				<View style={{ flex: 1, alignSelf: "stretch" }} /> */}
			</View>
		)
	}

	render() {
		const allUsers = users
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				{allUsers.map(user => {
					// This will render a row for each data element.
					return this.renderRow(user)
				})}
			</View>
		)
	}
}

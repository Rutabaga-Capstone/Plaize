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
import { observations } from "../seed"
// import { TextInputMask } from "react-native-masked-text"

export default class UpcomingObservationsTable extends React.Component {
	renderRow(observation) {
		return (
			<View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
				<View style={rowstyleLeft} />
				<Text>{observation.date}</Text>

				{/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
				<View style={rowstyle} />
				<Text>{observation.notes}</Text>
				<View style={rowstyle} />
				<Text>{observation.status}</Text>
				<View style={rowstyleRight} />
				<Text>{observation.score}</Text>
			</View>
			// </View>
		)
	}

	render() {
		const upcomingObservations = observations
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				{upcomingObservations.map(observation => {
					// This will render a row for each data element.
					if (observation.status !== "completed") {
						return this.renderRow(observation)
					}
					return null
				})}
			</View>
		)
	}
}

const rowstyle = {
	flex: 2,
	alignSelf: "stretch"
}

const rowstyleLeft = {
	flex: 1,
	alignSelf: "flex-start"
}

const rowstyleRight = {
	flex: 3,
	alignSelf: "flex-end"
}

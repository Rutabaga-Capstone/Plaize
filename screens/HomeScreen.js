import * as WebBrowser from "expo-web-browser"
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

import { MonoText } from "../components/StyledText"
import ImagePickerExample from "./ImagePickerExample"
import CameraExample from "./CameraExample"
import AllUsersTable from "../components/AllUsersTable"
import UpcomingObservationsTable from "../components/UpcomingObservationsTable"
import PastObservationsTable from "../components/PastObservationsTable"
import { CustomButton } from "../components/CustomButton"
import DraggableExample from "../components/DraggableExample"
import TableView from "../components/TableExample1"

export default function HomeScreen() {
	// const allObservations = <AllObservationsTable />
	// const upcomingObs = allObservations.filter(
	// 	observation => observation.status !== "completed"
	// )

	return (
		<View style={styles.container}>
			<View style={styles.tabBarInfoContainer}>
				<Text style={styles.tabBarInfoText}>Upcoming Observations</Text>
			</View>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<TableView />
				{/* <View>
					<Text style={styles.tableContainer1}>Upcoming Observations</Text>

				</View> */}
				{/* <View style={styles.welcomeContainer}>
					<Image
						source={
							__DEV__
								? require("../assets/images/Innovare-Stacked-Logo.png")
								: require("../assets/images/Innovare-Stacked-Logo.png")
						}
						style={styles.welcomeImage}
					/>
				</View> */}

				<View style={styles.getStartedContainer}>
					{/* <DevelopmentModeNotice />

					<Text style={styles.getStartedText}>Updated text</Text>

					<View
						style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
					>
          <MonoText>screens/HomeScreen.js</MonoText> */}
				</View>
				{/* <View style={{ flex: 2, flexDirection: "column" }}>
					<CameraExample />
				</View>
				<View>
					<ImagePickerExample />
				</View> */}
				{/* <View>
					<Text style={styles.tableContainer1}>Upcoming Observations</Text>
					<UpcomingObservationsTable style={{ alignContent: "stretch" }} />

					<Text style={styles.tableContainer2}>Completed Observations</Text>
					<PastObservationsTable style={{ alignContent: "stretch" }} />
				</View> */}

				{/* <View style={styles.helpContainer}>
					<TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
						<Text style={styles.helpLinkText}>
							Help, it didn’t automatically reload!
						</Text>
					</TouchableOpacity>
				</View> */}
			</ScrollView>
			<CustomButton style={{ color: "#fff" }} />

			{/* <View style={styles.tabBarInfoContainer}>
				<Text style={styles.tabBarInfoText}>
					This is a tab bar. You can edit it in:
				</Text>

				<View
					style={[styles.codeHighlightContainer, styles.navigationFilename]}
				>
					<MonoText style={styles.codeHighlightText}>
						navigation/MainTabNavigator.js
					</MonoText>
				</View>
			</View> */}
		</View>
	)
}

HomeScreen.navigationOptions = {
	header: null
}

function DevelopmentModeNotice() {
	if (__DEV__) {
		const learnMoreButton = (
			<Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
				Learn more
			</Text>
		)

		return (
			<Text style={styles.developmentModeText}>
				Development mode is enabled: your app will be slower but you can use
				useful development tools. {learnMoreButton}
			</Text>
		)
	} else {
		return (
			<Text style={styles.developmentModeText}>
				You are not in development mode: your app will run at full speed.
			</Text>
		)
	}
}

function handleLearnMorePress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/versions/latest/workflow/development-mode/"
	)
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	developmentModeText: {
		marginBottom: 20,
		color: "rgba(0,0,0,0.4)",
		fontSize: 14,
		lineHeight: 19,
		textAlign: "center"
	},
	contentContainer: {
		paddingTop: 30
	},
	welcomeContainer: {
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: "contain",
		marginTop: 3,
		marginLeft: -10
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50
	},
	homeScreenFilename: {
		marginVertical: 7
	},
	codeHighlightText: {
		color: "rgba(96,100,109, 0.8)"
	},
	codeHighlightContainer: {
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 3,
		paddingHorizontal: 4
	},
	getStartedText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		lineHeight: 24,
		textAlign: "center"
	},
	tabBarInfoContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.2,
				shadowRadius: 3
			},
			android: {
				elevation: 30
			}
		}),
		alignItems: "flex-start",
		backgroundColor: "#fbfbfb",
		paddingVertical: 20
	},
	tabBarInfoText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		padding: 2
	},
	navigationFilename: {
		marginTop: 5
	},
	helpContainer: {
		marginTop: 15,
		alignItems: "center"
	},
	helpLink: {
		paddingVertical: 15
	},
	helpLinkText: {
		fontSize: 14,
		color: "#2e78b7"
	},
	tableContainer1: {
		alignItems: "stretch",
		marginTop: 10,
		marginBottom: 20,
		color: "#3067B8",
		borderBottomColor: "black",
		borderBottomWidth: 1,
		borderStyle: "solid"
	},
	tableContainer2: {
		alignItems: "stretch",
		marginTop: 10,
		marginBottom: 20,
		color: "#808080",
		borderBottomColor: "black",
		borderBottomWidth: 1,
		borderStyle: "solid"
	},
	tableObsDate: {
		width: 10
	},
	tableObsScore: {
		width: 5
	},
	tableObsStatus: {
		width: 10
	},
	tableObsNotes: {
		width: 20
	}
	// completed: {
	// 	color: "greeen"
	// }
})

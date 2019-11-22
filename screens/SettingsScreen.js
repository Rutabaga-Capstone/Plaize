import React from "react"
import { ExpoConfigView } from "@expo/samples"
import ImagePickerExample from "./ImagePickerExample"
import CameraExample from "./CameraExample"
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

export default function SettingsScreen() {
	/**
	 * Go ahead and delete ExpoConfigView and replace it with your content;
	 * we just wanted to give you a quick view of your config.
	 */
	// return <ExpoConfigView />;
	return (
		<ScrollView>
			<View>
				<CameraExample />
			</View>
			<View>
				<ImagePickerExample />
			</View>
			<View>
				<Text>Announcements Feed</Text>
			</View>
			<View>
				<Text>- Announcement 1</Text>
			</View>
			<View>
				<Text>- Announcement 2</Text>
			</View>
		</ScrollView>
	)
}

SettingsScreen.navigationOptions = {
	title: "Announcements"
}

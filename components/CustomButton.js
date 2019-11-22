// custom-button.js

import React from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native"

export const CustomButton = props => {
	const { title = "Enter", style = {}, textStyle = {}, onPress } = props

	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
			<Text style={[styles.text, textStyle]}>{props.title}+</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		// display: "flex",
		height: 50,
		width: 50,
		borderRadius: 25,
		margin: 5,
		// justifyContent: "center",
		alignItems: "center",

		backgroundColor: "#89C238",
		shadowColor: "#89C238",
		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 10 },
		shadowRadius: 20,
		position: "absolute",
		bottom: 5,
		right: 5
	},

	text: {
		fontSize: 34,
		textTransform: "uppercase",
		color: "#FFFFFF"
	}
})

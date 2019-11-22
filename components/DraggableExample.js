import React from "react"
import Draggable from "react-native-draggable"
import { CustomButton } from "../components/CustomButton"
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

export default class DraggableExample extends React.Component {
	render() {
		console.log("in draggable")
		return (
			<View>
				<Draggable
					renderSize={56}
					renderColor="black"
					offsetX={-100}
					offsetY={-200}
					renderText="A"
					pressDrag={() => alert("touched!!")}
				/>
				{console.log("in draggable2")}
				<Draggable
					reverse={false}
					renderColor="red"
					renderShape="square"
					offsetX={0}
					offsetY={0}
					renderText="B"
				/>
				<Draggable />
				{/* <Draggable x={50} y={50}>
					<CustomButton />
				</Draggable> */}
			</View>
		)
	}
}

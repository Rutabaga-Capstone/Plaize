import React from "react"
import { Text, View, Button, TouchableOpacity } from "react-native"
import * as Permissions from "expo-permissions"
import { Camera } from "expo-camera"

export default class CameraExample extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		useCamera2Ap: true
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === "granted" })
	}

	render() {
		const { hasCameraPermission } = this.state
		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Camera style={{ flex: 1 }} type={this.state.type}>
						<View
							style={{
								flex: 2,
								backgroundColor: "transparent",
								flexDirection: "column",
								width: 100,
								height: 350
							}}
						>
							{/* <TouchableOpacity */}
							<Button
								title="Flip"
								style={{
									flex: 3,
									alignSelf: "flex-end",
									alignItems: "center"
								}}
								onPress={() => {
									this.setState({
										type:
											this.state.type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back
									})
								}}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: "white" }}
								>
									{" "}
									Flip{" "}
								</Text>
							</Button>
							{/* </TouchableOpacity> */}
						</View>
					</Camera>
				</View>
			)
		}
	}
}

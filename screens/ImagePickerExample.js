import * as React from "react"
import { Button, Image, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"

export default class ImagePickerExample extends React.Component {
	state = {
		image: null
	}

	render() {
		let { image } = this.state

		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Button title="Select from camera roll" onPress={this._pickImage} />
				{image && (
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
				)}
			</View>
		)
	}

	componentDidMount() {
		console.log("before get permissions")
		this.getPermissionAsync()
		console.log("after get permissions")
	}

	getPermissionAsync = async () => {
		console.log("inside get permissions")
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			if (status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!")
			}
		}
	}

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		console.log(result)

		if (!result.cancelled) {
			this.setState({ image: result.uri })
		}
	}
}

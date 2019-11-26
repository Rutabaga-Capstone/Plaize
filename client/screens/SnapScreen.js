import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  }

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }

  takePicture = () => {
    console.log(this.camera)
    if (this.camera) {
      this.camera.takePictureAsync({onPictureSaved: this.onPictureSaved})
    }
  }

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
    })
    this.setState({newPhotos: true})
  }

  render() {
    const {hasCameraPermission} = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera style={{flex: 1}} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  console.log(this.camera)
                  this.takePicture()
                }}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}
                  Take Picture!{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
  }
}

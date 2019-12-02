import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  }

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
    FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'photos').catch(
      e => {
        console.log(e, 'Directory exists')
      }
    )
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({onPictureSaved: this.onPictureSaved})
    }
  }

  onPictureSaved = photo => {
    const ipAddressOfServer = '172.17.23.197' // <--- PUT YOUR OWN IP HERE
    const uriParts = photo.uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    let formData = new FormData()
    formData.append('formKeyName', {
      uri: photo.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })
    axios
      .post(`http://${ipAddressOfServer}:1234/image`, formData)
      .then(response => {
        console.log(response.data)
        alert(
          `Plant ${response.data.commonName}\n probability${
            response.data.score
          } `
        )
      })
      .catch(err => {
        console.log(err)
      })
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
          <Camera
            ref={ref => {
              this.camera = ref
            }}
            style={{flex: 1}}
            type={this.state.type}
          >
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
                onPress={this.takePicture}
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

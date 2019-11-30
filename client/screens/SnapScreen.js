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
    FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'photos/').catch(
      e => {
        // console.log(FileSystem.cacheDirectory);
        // console.log(e, 'Directory exists')
      }
    )
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({onPictureSaved: this.onPictureSaved})
    }
  }

  onPictureSaved = async photo => {
    const ipAddressOfServer = 'http://localhost' // <--- PUT YOUR OWN IP HERE

    // console.log(photo.uri)
    let formdata = new FormData()
    formdata.append('formKeyName', {
      uri: photo.uri
      // name: 'formKeyName',
      // type: "image/jpg"
    })
    console.log(formdata)
    // await axios.post(`${ipAddressOfServer}:1234/image`, formdata)
    await fetch(`${ipAddressOfServer}:1234/image/`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formdata
    })
      .then(response => {
        console.log(formdata)
        console.log(response.status)
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

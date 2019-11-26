import React from 'react'
import {Platform, Text, View, SafeAreaView} from 'react-native'
import Map from '../components/Map'
import Plants from '../components/Plants'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Constants from 'expo-constants'

// A placeholder location until we get our own location and pins until we fetch them from the db

const region = {
  latitude: 41.895506,
  longitude: -87.639014,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

const pins = [
  {
    coordinate: {latitude: 41.895506, longitude: -87.639014},
    title: 'Fullstack Academy',
    isPoisonous: true,
    description: 'Nonpoisonous'
  },
  {
    coordinate: {latitude: 41.896461, longitude: -87.641228},
    title: 'Starbucks',
    isPoisonous: false,
    description: 'Poisonous'
  }
]

const styles = {
  container: {
    width: '100%',
    height: '80%'
  }
}

export default class MapScreen extends React.Component {
  state = {
    region: null,
    pins: [],
    location: null,
    errorMessage: null,
    center: null
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({
      location: location,
      center: location
    })
  }

  render() {
    let text = 'Waiting..'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }

    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
          pins={pins}
          location={this.state.location}
          center={this.state.center}
        />
      </SafeAreaView>
    )
  }
}

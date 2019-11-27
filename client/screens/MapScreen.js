import React from 'react'
import {Platform, Text, View, SafeAreaView} from 'react-native'
import Map from '../components/Map'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import * as geolib from 'geolib'
import Plants from '../components/Plants'

// Sample pins with plants until we fetch them from the db

const pins = [
  {
    id: 1,
    coordinate: {latitude: 41.895506, longitude: -87.639014},
    title: 'Fullstack Academy',
    hasPoisonousPlants: true,
    description: 'Best coding academy ever',
    plants: [
      {
        commonName: 'Poison Oak',
        scientificName: 'A scientific name....',
        isPoisonous: true,
        pin: {
          id: 1
        }
      },
      {
        commonName: 'Poison Ivy',
        scientificName: 'A scientific name....',
        isPoisonous: true,
        pin: {
          id: 1
        }
      }
    ]
  },
  {
    id: 2,
    coordinate: {latitude: 41.896461, longitude: -87.641228},
    title: 'Starbucks',
    hasPoisonousPlants: false,
    description: 'Fancy coffee shop',
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
        pin: {
          id: 2
        }
      }
    ]
  },
  {
    id: 3,
    coordinate: {latitude: 41.881737, longitude: -87.632751},
    title: 'Chiropractor',
    hasPoisonousPlants: false,
    description: 'Get your bones cracked here',
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
        pin: {
          id: 3
        }
      }
    ]
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
    location: null,
    errorMessage: null,
    center: null,
    radius: 1000,
    selectedPin: {},
    pins: [],
    plants: [],
    selectedPlant: {},
    pinFilter: null
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work in an Android emulator. Try it on your device!'
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
      center: location,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    })
  }

  filterMarkers(pins) {
    const radiusFromCenter = this.state.radius
    const radiusCenter = {
      latitude: this.state.center.coords.latitude,
      longitude: this.state.center.coords.longitude
    }

    return pins.filter((pin, i) => {
      let pinCoord = {
        latitude: pin.coordinate.latitude,
        longitude: pin.coordinate.longitude
      }
      if (
        geolib.isPointWithinRadius(pinCoord, radiusCenter, radiusFromCenter) ===
        true
      ) {
        return pin
      }
    })
  }

  onRegionChange(region) {
    this.setState({region})
  }

  render() {
    let text = 'Waiting..'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }

    return (
      <View>
        {this.state.location &&
          this.state.center && (
            <SafeAreaView style={styles.container}>
              <Map
                region={this.state.region}
                pins={this.filterMarkers(pins)}
                location={this.state.location}
                center={this.state.center}
                radius={this.state.radius}
                onRegionChange={this.state.onRegionChange}
              />
              <Plants pins={this.filterMarkers(pins)} />
            </SafeAreaView>
          )}
      </View>
    )
  }
}

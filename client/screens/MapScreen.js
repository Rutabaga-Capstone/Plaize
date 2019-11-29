import React from 'react'
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet
} from 'react-native'
import Map from '../components/Map'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import * as geolib from 'geolib'
import Plants from '../components/Plants'
import {Slider} from 'react-native-elements'
import SwitchSelector from 'react-native-switch-selector'
import {TagSelect} from 'react-native-tag-select'

// Sample pins with plants until we fetch them from the db
const PINS = [
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 400,
    marginLeft: 190,
    position: 'absolute'
  },
  buttonContainer: {
    padding: 5
  },
  buttonInner: {
    marginBottom: 10
  },
  labelText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 15
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF'
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#333'
  },
  labelSelected: {
    color: '#FFF'
  }
})

export default class MapScreen extends React.Component {
  state = {
    region: null,
    location: null,
    center: null,
    radius: 700, //in meters
    selectedPin: {},
    pins: PINS,
    plants: [],
    selectedPlant: {},
    tagsSelected: []
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      let errorMessage =
        'Oops, this will not work in an Android emulator. Try it on your device!'
      console.log(errorMessage)
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      let errorMessage = 'Permission to access location was denied'
      console.log(errorMessage)
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

  filterMarkers(currentPins, tagsSelected, radius) {
    const radiusFromCenter = radius
    const radiusCenter = {
      latitude: this.state.center.coords.latitude,
      longitude: this.state.center.coords.longitude
    }

    const filteredPins = PINS.filter((pin, i) => {
      let pinCoord = {
        latitude: pin.coordinate.latitude,
        longitude: pin.coordinate.longitude
      }
      if (
        geolib.isPointWithinRadius(pinCoord, radiusCenter, radiusFromCenter) ===
          true &&
        tagsSelected.length &&
        pin.isPoisonous === false
      ) {
        return pin
      } else if (
        geolib.isPointWithinRadius(pinCoord, radiusCenter, radiusFromCenter) ===
          true &&
        tagsSelected.length &&
        pin.isPoisonous === true
      ) {
        return pin
      } else if (
        geolib.isPointWithinRadius(pinCoord, radiusCenter, radiusFromCenter) ===
          true &&
        !tagsSelected.length
      ) {
        return pin
      } else {
        return null
      }
    })
    this.setState({
      pins: filteredPins,
      tagsSelected,
      radius: radius
    })
    console.log('this.state in Map comp:', this.state)
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

    const data = [{id: 1, label: 'Poisonous'}, {id: 2, label: 'Nonpoisonous'}]

    return (
      this.state.pins &&
      this.state.location &&
      this.state.center && (
        <View>
          <SafeAreaView style={styles.container}>
            <Map
              region={this.state.region}
              pins={this.state.pins}
              location={this.state.location}
              center={this.state.center}
              radius={this.state.radius}
              onRegionChange={region => this.onRegionChange(region)}
              tagsSelected={this.state.tagsSelected}
            />
            <View style={styles2.container}>
              <TagSelect
                ref={tag => {
                  this.tag = tag
                }}
                data={data}
                itemStyle={styles2.item}
                itemLabelStyle={styles2.label}
                itemStyleSelected={styles2.itemSelected}
                itemLabelStyleSelected={styles2.labelSelected}
                onItemPress={() =>
                  this.filterMarkers(
                    this.state.pins,
                    this.tag.itemsSelected,
                    this.state.radius
                  )
                }
              />
            </View>
            <View
              style={{
                position: 'absolute',
                alignItems: 'stretch',
                top: 350,
                width: 320,
                alignSelf: 'center'
              }}
            >
              <Slider
                value={this.state.radius}
                mainimumValue={100}
                maximumValue={1000}
                step={100}
                onValueChange={radius =>
                  this.filterMarkers(
                    this.state.pins,
                    this.state.tagsSelected,
                    radius
                  )
                }
                thumbTintColor={'black'}
                animateTransitions={true}
              />
              <Text style={{fontSize: 12}}>
                Radius in meters: {this.state.radius}
              </Text>
            </View>
          </SafeAreaView>
          <ScrollView>
            <Plants pins={this.state.pins} />
          </ScrollView>
        </View>
      )
    )
  }
}

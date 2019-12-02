import React, {useEffect, useState} from 'react'
import MapView, {Marker, Circle} from 'react-native-maps'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'
import {
  setPins,
  setLocation,
  setRegion,
  setPinSelected,
  clearPinSelected,
  openModal,
  closeModal
} from '../store/actions'

import pinsData from '../store/pins' //fake data for now
import PlantModal from '../components/PlantModal'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as geolib from 'geolib'

import {
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  FlatList,
  List,
  ActivityIndicator,
  Dimensions
} from 'react-native'

import {ListItem} from 'react-native-elements'
// import TouchableScale from 'react-native-touchable-scale' // https://github.com/kohver/react-native-touchable-scale
// import ExpoLinearGradient from 'react-native-linear-gradient'

///OLD below

import Map from '../components/Map'
import Constants from 'expo-constants'

import Plants from '../components/Plants'
import {Slider} from 'react-native-elements'
import SwitchSelector from 'react-native-switch-selector'
import {TagSelect} from 'react-native-tag-select'

export default function MapScreen(props) {
  const dispatch = useDispatch()

  //1 - DECLARE VARIABLES
  const [isFetching, setIsFetching] = useState(false)

  //Access Redux Store State

  const pinsReducer = useSelector(state => state.pinsReducer)
  const {pins} = pinsReducer

  const locationReducer = useSelector(state => state.locationReducer)
  const {location} = locationReducer

  const regionReducer = useSelector(state => state.regionReducer)
  const {region} = regionReducer

  const pinSelectedReducer = useSelector(state => state.pinSelectedReducer)
  const {pinSelected} = pinSelectedReducer

  const modalActionReducer = useSelector(state => state.modalActionReducer)
  const {modalAction} = modalActionReducer

  //==================================================================================================

  //2 - EFFECTS
  useEffect(() => getPins(), [])
  useEffect(() => getLocation(), [])
  useEffect(() => getRegion(), [])
  useEffect(() => handleMarkerOnPress(), [])
  useEffect(() => handleMarkerOnDeselect(), [])
  useEffect(() => getModal(), [])

  //==================================================================================================

  //3 - GET DATA AND DISPATCH ACTIONS
  const getPins = () => {
    setIsFetching(true)

    //OPTION 1 - LOCAL DATA from imported file
    setTimeout(() => {
      const pins = pinsData
      dispatch(setPins(pins))
      setIsFetching(false)
    }, 2000)

    //OPTION 2 - API CALL, i.e. axios
    // let url = "https://my-json-server.typicode.com/mesandigital/demo/instructions";
    // axios.get(url)
    //     .then(res => res.data)
    //     .then((data) => dispatch(addData(data)))
    //     .catch(error => alert(error.message))
    //     .finally(() => setIsFetching(false));

    //OPTION 3 - GRAPHQL - TBD
  }

  const fetchLocationAsync = async () => {
    try {
      let {status} = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        let errorMessage = 'Permission to access location was denied'
        console.log(errorMessage)
      }
      let location = await Location.getCurrentPositionAsync({})
      dispatch(setLocation(location))
    } catch (err) {
      console.log(err)
    }
  }

  const getLocation = () => {
    fetchLocationAsync() //use this indirect func because useEffect does not accept promises as callbacks directly
  }

  const getRegion = () => {
    dispatch(setRegion(region))
  }

  const distanceFromLocation = (pin, accuracy = 1) => {
    const distance = geolib.getDistance(
      location.coords,
      pin.coordinate,
      accuracy
    )
    return <Text>{distance.toString()} meters away</Text>
  }

  const handleMarkerOnPress = pin => {
    dispatch(setPinSelected(pin))
  }

  const handlePinItemOnPress = pin => {
    dispatch(setPinSelected(pin))
  }

  const handleMarkerOnDeselect = () => {
    let pin = {}
    dispatch(clearPinSelected(pin))
  }

  const getModal = () => {
    if (modalAction === ('' || 'closeModal')) {
      dispatch(openModal('openModal'))
    }
    dispatch(closeModal('closeModal'))
  }

  //==================================================================================================

  //4 - RENDER
  if (isFetching) {
    return (
      <View style={styles99.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    )
  } else {
    return (
      <View>
        {{location} && {pins} && (
            <View>
              <MapView
                style={styles.mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
              >
                {pins.map((pin, i) => (
                  <Marker
                    key={i}
                    title={pin.title}
                    coordinate={pin.coordinate}
                    pinColor={pin.hasPoisonousPlants ? 'red' : 'green'}
                    description={pin.description}
                    id={pin.id}
                    onPress={() => handleMarkerOnPress(pin)}
                    onSelect={() => handleMarkerOnPress(pin)}
                    onDeselect={() => handleMarkerOnDeselect()}
                  />
                ))}
              </MapView>
            </View>
          )}
        {!pinSelected.id &&
          pins && (
            <ScrollView>
              {pins.map((pin, i) => (
                <ListItem
                  key={i}
                  title={pin.title}
                  // subtitle={() => distanceFromLocation(pin)}
                  bottomDivider
                  badge={{
                    value: distanceFromLocation(pin),
                    textStyle: {color: 'white'},
                    // containerStyle: {
                    //   marginTop: -20
                    // },
                    badgeStyle: {backgroundColor: '#6cc7bd'}
                  }}
                  onPress={() => handlePinItemOnPress(pin)}
                />
              ))}
            </ScrollView>
          )}
        {pinSelected.id && (
          <ScrollView>
            <ListItem
              title={pinSelected.title}
              // subtitle={distanceFromLocation(pinSelected)}
              bottomDivider
              badge={{
                value: distanceFromLocation(pinSelected),
                textStyle: {color: 'white'},
                // containerStyle: {marginTop: -20},
                badgeStyle: {backgroundColor: '#6cc7bd'}
              }}
            />

            {/* {pinSelected.plants.map((plant, i) => (
              <Text key={i}>{plant.commonName}</Text>
            ))} */}
          </ScrollView>
        )}
        {pinSelected.id && (
          <Container>
            <PlantModal />
          </Container>
        )}
      </View>
    )
  }
}

//==================================================================================================

//5 - STYLING

const Container = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 80%;
`

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`

const styles = {
  container: {
    width: '100%',
    height: '80%'
  },
  // mapContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
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

const styles99 = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },

  title: {
    fontSize: 15,
    fontWeight: '600'
  },

  description: {
    marginTop: 5,
    fontSize: 14
  }
})

//   <View>
//     <SafeAreaView style={styles.container}>
//       <Map
//         region={this.state.region}
//         pins={this.state.pins}
//         location={this.state.location}
//         center={this.state.center}
//         radius={this.state.radius}
//         onRegionChange={()=> dispatch(onRegionChange(location))}
//         tagsSelected={this.state.tagsSelected}
//       />
//       <View style={styles2.container}>
//         <TagSelect
//           ref={tag => {
//             this.tag = tag
//           }}
//           data={data}
//           itemStyle={styles2.item}
//           itemLabelStyle={styles2.label}
//           itemStyleSelected={styles2.itemSelected}
//           itemLabelStyleSelected={styles2.labelSelected}
//           onItemPress={() =>
//             this.filterMarkers(
//               this.state.pins,
//               this.tag.itemsSelected,
//               this.state.radius
//             )
//           }
//         />
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           alignItems: 'stretch',
//           top: 350,
//           width: 320,
//           alignSelf: 'center'
//         }}
//       >
//         <Slider
//           value={this.state.radius}
//           mainimumValue={100}
//           maximumValue={1000}
//           step={100}
//           onValueChange={radius =>
//             this.filterMarkers(
//               this.state.pins,
//               this.state.tagsSelected,
//               radius
//             )
//           }
//           thumbTintColor={'black'}
//           animateTransitions={true}
//         />
//         <Text style={{fontSize: 12}}>
//           Radius in meters: {this.state.radius}
//         </Text>
//       </View>
//     </SafeAreaView>
//     <ScrollView>
//       <Plants pins={this.state.pins} />
//     </ScrollView>
//   </View>
// )
//   )
// }

// state = {
//   region: null,
//   location: null,
//   center: null,
//   radius: 700, //in meters
//   selectedPin: {},
//   pins: [],
//   plants: [],
//   selectedPlant: {},
//   tagsSelected: [
//     {
//       id: 1,
//       label: 'Poisonous'
//     },
//     {
//       id: 2,
//       label: 'Nonpoisonous'
//     }
//   ]
// }

// onRegionChange(region) {
//   this.setState({region})
// }

// const data = [
//   {id: 1, label: 'Poisonous'},
//   {id: 2, label: 'Nonpoisonous'}
// ]

// const initialRegion = {
//   latitude: 41.888824,
//   longitude: -87.647408,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421
// }

// export function filterMarkers(currentPins, tagsSelected, radius) {
//   const radiusFromCenter = radius
//   const radiusCenter = {
//     latitude: this.state.center.coords.latitude,
//     longitude: this.state.center.coords.longitude
//   }
// console.log('tagsSelected: ', tagsSelected)
// console.log(
//   'haspoison plant:',
//   tagsSelected.filter(tag => tag.label === 'Poisonous').length
// )
// console.log(
//   'does not have poison plant:',
//   tagsSelected.filter(tag => tag.label === 'Nonpoisonous').length
// )

//   const filteredPins = PINS.filter((pin, i) => {
//     let pinCoord = {
//       latitude: pin.coordinate.latitude,
//       longitude: pin.coordinate.longitude
//     }
//     if (
//       geolib.isPointWithinRadius(pinCoord, radiusCenter, radiusFromCenter) ===
//       true
//     ) {
//       if (
//         tagsSelected.filter(tag => tag.label === 'Nonpoisonous').length &&
//         pin.isPoisonous === false
//       ) {
//         return pin
//       }
//       if (
//         tagsSelected.filter(tag => tag.label === 'Poisonous').length &&
//         pin.isPoisonous === true
//       ) {
//         return pin
//       }
//       if (!tagsSelected.length) {
//         return pin
//       }
//     }
//   })
//   this.setState({
//     pins: filteredPins,
//     tagsSelected,
//     radius: radius
//   })
// }

import React, {useEffect, useState} from 'react'
import MapView, {Marker, Circle} from 'react-native-maps'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'
import {
  // setPins,
  // setLocation,
  setRegion,
  setPinSelected,
  clearPinSelected
  // openModal,
  // closeModal
} from '../store/actions'

//import pinsData from '../store/pins' //fake data for now
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
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

import {ListItem} from 'react-native-elements'
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import TopNavigation from '../components/TopNavigation'

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
  let sortedPins = []
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

  // const modalActionReducer = useSelector(state => state.modalActionReducer)
  // const {modalAction} = modalActionReducer

  //==================================================================================================

  //2 - EFFECTS
  // useEffect(() => getPins(), [pinCreated])
  // useEffect(() => getLocation(), [])
  useEffect(() => getRegion(), [])
  // useEffect(() => handleMarkerOnPress(), [])
  // useEffect(() => handleMarkerOnDeselect(), [])
  // useEffect(() => getModal(), [])

  //==================================================================================================

  //3 - GET DATA AND DISPATCH ACTIONS
  // const getPins = () => {
  //   setIsFetching(true)
  //   //OPTION 1 - LOCAL DATA from imported file
  //   setTimeout(() => {
  //     const allpins = pinsData
  //     dispatch(setPins(allpins))
  //     console.log(pins)
  //     setIsFetching(false)
  //   }, 2000)
  //   //OPTION 2 - API CALL, i.e. axios
  //   // let url = "https://my-json-server.typicode.com/mesandigital/demo/instructions";
  //   // axios.get(url)
  //   //     .then(res => res.data)
  //   //     .then((data) => dispatch(addData(data)))
  //   //     .catch(error => alert(error.message))
  //   //     .finally(() => setIsFetching(false));
  //OPTION 3 - GRAPHQL - TBD
  // }
  // const fetchLocationAsync = async () => {
  //   try {
  //     let {status} = await Permissions.askAsync(Permissions.LOCATION)
  //     if (status !== 'granted') {
  //       let errorMessage = 'Permission to access location was denied'
  //       console.log(errorMessage)
  //     }
  //     let location = await Location.getCurrentPositionAsync({})
  //     dispatch(setLocation(location))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // const getLocation = () => {
  //   fetchLocationAsync() //use this indirect func because useEffect does not accept promises as callbacks directly
  // }

  const getRegion = () => {
    dispatch(setRegion(region))
  }

  const distanceFromLocation = (pin, accuracy = 1) => {
    const distance = geolib.getDistance(
      location.coords,
      pin.coordinate,
      accuracy
    )
    pin.distance = distance
    sortedPins.push(pin)
    return <Text>{distance.toString()} meters away</Text>
  }

  const sortPins = pinsToSort => {
    var mapped = pinsToSort.map(function(el, i) {
      return {index: i, value: el}
    })

    mapped.sort(function(a, b) {
      if (a.value.distance > b.value.distance) {
        return 1
      }
      if (a.value.distance < b.value.distance) {
        return -1
      }
      return 0
    })

    sortedPins = mapped.map(function(el) {
      return pinsToSort[el.index]
    })

    return sortedPins
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

  // const getModal = () => {
  //   if (modalAction === ('' || 'closeModal')) {
  //     dispatch(openModal('openModal'))
  //   }
  //   dispatch(closeModal('closeModal'))
  // }

  //==================================================================================================

  //4 - RENDER
  if (!pins) {
    return (
      <View style={styles99.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    )
  } else {
    sortedPins = sortPins(pins)
    return (
      <>
        <TopNavigation />
        <View>
          {location &&
            sortedPins && (
              <View>
                <MapView
                  style={styles.mapStyle}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  followsUserLocation={true}
                  zoomEnabled={true}
                  zoomTapEnabled={true}
                >
                  {sortedPins.map((pin, i) => (
                    <Marker
                      key={i}
                      title={pin.title}
                      coordinate={pin.coordinate}
                      pinColor={pin.plants[0].isPoisonous ? 'red' : 'green'}
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
            sortedPins && (
              <ScrollView>
                {sortedPins.sort().map((pin, i) => (
                  <ListItem
                    key={i}
                    title={pin.title}
                    bottomDivider
                    badge={{
                      value: distanceFromLocation(pin),
                      textStyle: {color: 'white'},
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
                subtitle={distanceFromLocation(pinSelected)}
                bottomDivider
                badge={{
                  value: distanceFromLocation(pinSelected),
                  textStyle: {color: 'white'},
                  badgeStyle: {backgroundColor: '#6cc7bd'}
                }}
              />
            </ScrollView>
          )}
          {pinSelected.id && (
            <Container>
              <PlantModal pinSelected={pinSelected} />
            </Container>
          )}
        </View>
      </>
    )
  }
}

MapScreen.navigationOptions = {
  header: null
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
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0
  },
  // mapContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  topNav: {
    position: 'absolute',
    top: 0,
    zIndex: 10000000
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    marginTop: 0
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

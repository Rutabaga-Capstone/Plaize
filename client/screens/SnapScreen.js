import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import PlantModal from '../components/PlantModal'
import {useMutation, useApolloClient} from '@apollo/react-hooks'
import {
  CREATE_PIN_PLANT,
  ADD_PIN_PLANT_TO_USER,
  UPDATE_USER_LEAVES
} from '../constants/GqlMutations'
import {
  GET_PLANT_BY_COMMON_NAME,
  GET_USER_LEAVES
} from '../constants/GqlQueries'
import uuid from 'react-uuid'
import styled from 'styled-components'
import {setPinSelected, setLocation} from '../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import * as Location from 'expo-location'
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import {addPlant} from '../store/actions'

export default function SnapScreen() {
  const [isPlantInfoReceived, setIsPlantInfoReceived] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState('null')
  const client = useApolloClient()
  const [CreatePinPlant] = useMutation(CREATE_PIN_PLANT)
  const [AddPinPlantToUser] = useMutation(ADD_PIN_PLANT_TO_USER)
  const [UpdateUserLeaves] = useMutation(UPDATE_USER_LEAVES)
  const dispatch = useDispatch()
  const pinSelected = useSelector(state => state.pinSelected)

  let camera = null

  const locationReducer = useSelector(state => state.locationReducer)
  const {location} = locationReducer

  useEffect(() => getLocation(), [])
  useEffect(() => {
    async function startUp() {
      const {status} = await Permissions.askAsync(Permissions.CAMERA)
      setHasCameraPermission('granted')
      FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'photos').catch(
        e => {
          console.log(e, 'Directory exists')
        }
      )
    }
    startUp()
  }, [])

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
  const takePicture = () => {
    if (camera) {
      camera.takePictureAsync({onPictureSaved})
    }
  }

  const buttonCallback = function() {
    setIsPlantInfoReceived(false)
  }

  const onPictureSaved = photo => {
    const ipAddressOfServer = '172.17.22.211' // <--- PUT YOUR OWN IP HERE
    const uriParts = photo.uri.split('.')
    const fileType = uriParts[uriParts.length - 1]
    let plantCopy

    let formData = new FormData()
    formData.append('formKeyName', {
      uri: photo.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })
    axios
      .post(`http://${ipAddressOfServer}:1234/image`, formData)
      .then(response => {
        console.log(response.data.commonName)
        // if (response.data.score < 0.5) { throw(new Error) }

        /*
        1. Take photo
        2. On mobile device , via axios upload the photo to backend
        3. Backend will hit Google API and respond with  i.e.

        {
        commonName: 'Poison Ivy',
        score: 0.5741239190101624
        }

        if the score is not high enough I will show alert that plant has not been recognized
        4. Frontend client will shoot querry asking for more info about 'Poison Ivy'
        5. Once I have info about posion ivy, location, I am ready to create pin
        6. PIN creation
        */
        client
          .query({
            query: GET_PLANT_BY_COMMON_NAME,
            variables: {
              // commonName: response.data.commonName
              commonName: 'Poison Ivy'
            }
          })
          .then(plant => {
            delete plant.data.plant.__typename
            plantCopy = plant.data.plant
            dispatch(addPlant(plantCopy))
            console.log('plant:', plant)
            console.log('then after query', {
              ...plant.data.plant,
              plantId: uuid(),
              pinId: uuid(),
              lat: location.coords.latitude,
              lng: location.coords.longitude
            })
            CreatePinPlant({
              variables: {
                ...plant.data.plant,
                plantId: uuid(),
                pinId: uuid(),
                lat: location.coords.latitude,
                lng: location.coords.longitude
              }
            })
              .then(creations => {
                console.log('creations: ', creations)
                AddPinPlantToUser({
                  variables: {
                    pinId: creations.data.CreatePin.id,
                    plantId: creations.data.CreatePlant.id,
                    userId: '5' // needs to be related to currentUser ID
                  }
                })
                const newpin = {
                  ...creations.data.CreatePin,
                  plants: [plantCopy]
                }
                dispatch(setPinSelected(newpin))
                setIsPlantInfoReceived(true)
                console.log('newpin.plants', newpin.plants)
              })
              .catch(() => {
                console.log('Unable to associate plant with user')
              })
          })
          .catch(() => {
            console.log('Could not query for plant')
          })
      })
      .catch(err => {
        console.log(err)
        alert('Plant has not been identified')
      })
  }

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
    return (
      <>
        {/* TOP 'NAVIGATION' */}
        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
          <View
            style={{
              width: '33.3%',
              height: 40,
              textAlign: 'left',
              borderBottomColor: '#C7CAD4',
              borderBottomWidth: 1,
              marginBottom: 10
            }}
            onPress={takePicture}
          >
            <Text
              style={{
                textAlign: 'left',
                marginLeft: 15
              }}
            >
              <SimpleLineIcons
                name="logout"
                onPress={this.logoutUser}
                size={25}
                color="#C7CAD4"
                style={{
                  textAlign: 'left'
                }}
              />
            </Text>
          </View>

          <View
            style={{
              width: '33.3%',
              height: 40,
              textAlign: 'middle',
              borderBottomColor: '#C7CAD4',
              borderBottomWidth: 1,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                fontFamily: 'yorkten',
                color: '#C7CAD4'
              }}
            >
              Plaze
            </Text>
          </View>

          <View
            style={{
              width: '33.3%',
              height: 40,
              textAlign: 'right',
              borderBottomColor: '#C7CAD4',
              borderBottomWidth: 1,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                textAlign: 'right',
                marginRight: 15
              }}
            >
              <Ionicons
                name="ios-leaf"
                size={25}
                style={{
                  color: '#C7CAD4'
                }}
              />
            </Text>
          </View>
        </View>
        {/* END TOP 'NAVIGATION' */}

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
      </>
    )
  }
}

const Container = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 80%;
`

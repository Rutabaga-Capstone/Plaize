import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
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
import {
  setPinCreated,
  setPinSelected,
  setLocation,
  addPlant,
  updateUserDataLeaves,
  addPin,
  setLeaves
} from '../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import * as Location from 'expo-location'
import TopNavigation from '../components/TopNavigation'

import {EXPRESS_SERVER_ADDRESS, EXPRESS_SERVER_PORT} from 'react-native-dotenv'

import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton
} from 'react-native-modals'

import styles from '../styles/SnapScreenStyles'

export default function SnapScreen(props) {
  // const {navigate} = props.navigation
  // props.navigation.navigate('PlantInfo')
  const locationReducer = useSelector(state => state.locationReducer)
  const {location} = locationReducer
  const [isPlantInfoReceived, setIsPlantInfoReceived] = useState(false)
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(true)

  const [hasCameraPermission, setHasCameraPermission] = useState('null')
  const client = useApolloClient()
  const [CreatePinPlant] = useMutation(CREATE_PIN_PLANT)
  const [AddPinPlantToUser] = useMutation(ADD_PIN_PLANT_TO_USER)
  const [UpdateUserLeaves] = useMutation(UPDATE_USER_LEAVES)
  const dispatch = useDispatch()
  // const pinSelected = useSelector(state => state.pinSelected)
  const pinCreated = useSelector(state => state.pinCreated)

  let camera = null

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
    const uriParts = photo.uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    let formData = new FormData()
    formData.append('formKeyName', {
      uri: photo.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })

    axios
      .post(
        `http://${EXPRESS_SERVER_ADDRESS}:${EXPRESS_SERVER_PORT}/image`,
        formData
      )
      .then(({data: {commonName}}) => {
        console.log('Plant identification response', commonName)
        client
          .query({
            query: GET_PLANT_BY_COMMON_NAME,
            variables: {
              commonName
            }
          })
          .then(({data: {plant}}) => {
            dispatch(addPlant(plant))
            dispatch(setLeaves())
            client
              .query({
                query: GET_USER_LEAVES,
                variables: {
                  email: 'cc'
                }
              })
              .then(({data: {user: {leaves}}}) => {
                UpdateUserLeaves({
                  variables: {
                    id: '5',
                    leaves
                  }
                })
                  .then(({data: {UpdateUser: {leaves}}}) => {
                    dispatch(updateUserDataLeaves(leaves))
                  })
                  .catch(err => {
                    console.error(err)
                  })
              })

            CreatePinPlant({
              variables: {
                ...plant,
                isPoisonous: true,
                plantId: uuid(),
                pinId: uuid(),
                lat: location.coords.latitude,
                lng: location.coords.longitude
              }
            })
              .then(({data}) => {
                AddPinPlantToUser({
                  variables: {
                    pinId: data.CreatePin.id,
                    plantId: data.CreatePlant.id,
                    userId: '5' // needs to be related to currentUser ID
                  }
                })
                const newpin = {
                  ...data.CreatePin,
                  plants: [plant],
                  title: plant.commonName,
                  description: ''
                }

                newpin.coordinate = {
                  latitude: newpin.lat,
                  longitude: newpin.lng
                }
                dispatch(addPin(newpin))
                dispatch(setPinCreated(newpin))
                setIsPlantInfoReceived(true)
                props.navigation.navigate('PlantInfo', plant)
              })
              .catch(err => {
                console.error(err)
              })
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch(err => {
        console.log(
          'Tried to send an AJAX request to: ',
          EXPRESS_SERVER_ADDRESS
        )
        console.error(err)
        alert('Sending image to server failed')
      })
  }

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
    return (
      <>
        <StatusBar hidden={true} />
        <TopNavigation {...props} />
        <View style={styles.container}>
          <Modal
            visible={isWelcomeModalVisible}
            modalTitle={
              <View style={{flexDirection: 'row'}}>
                <ModalTitle
                  title={
                    <>
                      <Ionicons
                        name="ios-leaf"
                        color="#6CC7BD"
                        size={25}
                        style={styles.leafIcon}
                      />
                      <Text> Welcome to Plaze </Text>
                      <Ionicons name="ios-leaf" color="#6CC7BD" size={25} />
                    </>
                  }
                />
              </View>
            }
            width={0.7}
            footer={
              <ModalFooter>
                <ModalButton
                  text="OK"
                  onPress={() => {
                    setIsWelcomeModalVisible(false)
                  }}
                />
              </ModalFooter>
            }
          >
            <ModalContent>
              <Text style={styles.welcomeMessage}>
                {' '}
                Earn leaves and help your community by identifying plants -
                poisonous and otherwise.
                {'\n \n'}
                View the map to see poisonous plants that others have identified
                near you.
                {'\n \n'}
                Check your profile to see all the plants you've found and your
                current ranking!
              </Text>
            </ModalContent>
          </Modal>
        </View>

        <Camera
          ref={ref => {
            camera = ref
          }}
          style={{flex: 1, borderTopWidth: 0}}
          type={Camera.Constants.Type.back}
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
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={takePicture}
            >
              <Ionicons
                name="md-radio-button-off"
                size={70}
                style={{marginBottom: 15}}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Camera>

        {isPlantInfoReceived &&
          pinCreated && (
            <Container>
              <PlantModal disableModalCallback={buttonCallback} />
            </Container>
          )}
      </>
    )
  }
}

SnapScreen.navigationOptions = {
  header: null
}

const Container = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 80%;
`

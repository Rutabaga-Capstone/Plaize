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

import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton
} from 'react-native-modals'

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
        console.log('Plant identification response', response.data.commonName)

        // alert(
        //   `Plant identified: ${response.data.commonName} \n probability: ${
        //     response.data.score
        //   }`
        // )
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
            dispatch(setLeaves())
            console.log('plant:', plant)

            console.log('then after query', {
              ...plant.data.plant,
              plantId: uuid(),
              pinId: uuid(),
              lat: location.coords.latitude,
              lng: location.coords.longitude
            })

            //This is all new

            client
              .query({
                query: GET_USER_LEAVES,
                variables: {
                  email: 'cc'
                }
              })
              .then(response => {
                console.log('XXXXXXXXXXXgetUserLeaves', response)
                UpdateUserLeaves({
                  variables: {
                    id: '5',
                    leaves: response.data.user.leaves
                  }
                })
                  .then(response => {
                    console.log('YYYYYYYYYUpdateUserLeaves', response)
                    dispatch(
                      updateUserDataLeaves(response.data.UpdateUser.leaves)
                    )
                  })
                  .catch(() => {
                    console.log('Could not update user')
                  })
              })

            //this is not new

            CreatePinPlant({
              variables: {
                ...plant.data.plant,
                isPoisonous: true,
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

                newpin.title = plantCopy.commonName
                newpin.description = ''
                newpin.coordinate = {
                  latitude: newpin.lat,
                  longitude: newpin.lng
                }
                console.log('newpin before dispatch actions:', newpin)
                dispatch(addPin(newpin))

                // This is still the then for the client.query for create pin plant
                dispatch(setPinCreated(newpin))
                // dispatch(setPinSelected(newpin))
                setIsPlantInfoReceived(true)
                console.log('newpin.plants', newpin.plants)
                props.navigation.navigate('PlantInfo', plantCopy)
              })
              .catch(() => {
                // this is the catch for create pin plant
                console.log('Unable to associate plant with user')
              })
          })
          .catch(() => {
            // this is the then for client.query for get plant
            console.log('Could not query for plant')
          })
      })
      .catch(err => {
        // this is the catch for axios.post for autoML
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
        <StatusBar hidden={true} />
        <TopNavigation />
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
                      <Text>        Welcome to Plaze       </Text>
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

const styles = StyleSheet.create({
  leafIcon: {
    transform: [{rotateY: '180deg'}]
  },
  container: {
    backgroundColor: 'transparent',
    marginTop: 400,
    marginLeft: 190,
    position: 'absolute'
  },
  welcomeMessage: {
    textAlign: 'center',
    marginTop: 10
  }
})

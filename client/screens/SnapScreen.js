import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import {Ionicons} from '@expo/vector-icons'
import PlantModal from '../components/PlantModal'
import {useMutation, useApolloClient} from '@apollo/react-hooks'
import {
  CREATE_PIN_PLANT,
  ADD_PIN_PLANT_TO_USER,
  GET_PLANT_BY_COMMON_NAME
} from '../constants/GqlMutations'
import uuid from 'react-uuid'

import styled from 'styled-components'
import {getPlantDataStubbedQuerry} from '../store/plants'

export default function SnapScreen() {
  const [isPlantInfoReceived, setIsPlantInfoReceived] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState('null')
  const client = useApolloClient()
  const [CreatePinPlant] = useMutation(CREATE_PIN_PLANT)
  const [AddPinPlantToUser] = useMutation(ADD_PIN_PLANT_TO_USER)
  let camera = null

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

  const takePicture = () => {
    if (camera) {
      camera.takePictureAsync({onPictureSaved})
    }
  }

  const buttonCallback = function() {
    setIsPlantInfoReceived(false)
  }

  const getPlantData = function(plantLabel) {
    return getPlantDataStubbedQuerry(plantLabel)
  }

  const onPictureSaved = photo => {
    const ipAddressOfServer = '10.0.0.48' // <--- PUT YOUR OWN IP HERE
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
        setIsPlantInfoReceived(true)
        console.log(response.data)

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
              commonName: response.data.commonName
            }
          })
          .then(async plant => {
            Permissions.askAsync(Permissions.LOCATION).then(res => {
              if (res.status !== 'granted') {
                let errorMessage = 'Permission to access location was denied'
                console.log(errorMessage)
              }
              Location.getCurrentPositionAsync({}).then(location => {
                CreatePinPlant({
                  variables: {
                    ...plant,
                    plantId: uuid(),
                    pinId: uuid(),
                    lat: location.latitude,
                    lng: location.longitude
                  }
                })
                  .then(creations => {
                    AddPinPlantToUser({
                      variables: {
                        pinId: creations.data.CreatePin.id,
                        plantId: creations.data.CreatePlant.id,
                        userId: uuid() // needs to be related to currentUser ID
                      }
                    })
                  })
                  .catch(() => {
                    console.log('Unable to associate plant with user')
                  })
              })
            })
          })
          .catch(() => {
            console.log('Could not query for plant')
          })
      })
      .catch(() => {
        alert('Plant has not been identified')
      })
  }

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
    return (
      <View style={{flex: 1}}>
        <Camera
          ref={ref => {
            camera = ref
          }}
          style={{flex: 1}}
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
              <Ionicons name="md-camera" size={48} style={{marginBottom: 30}} />
            </TouchableOpacity>
          </View>
        </Camera>

        {isPlantInfoReceived && (
          <Container>
            <PlantModal disableModalCallback={buttonCallback} />
          </Container>
        )}
      </View>
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

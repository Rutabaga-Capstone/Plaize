import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import {Ionicons} from '@expo/vector-icons'
import PlantModal from '../components/PlantModal'
import {useDispatch, useSelector} from 'react-redux'
import * as Location from 'expo-location'

import styled from 'styled-components'
import {getPlantInfoQuerry} from '../store/plants'

import {setLocation} from '../store/actions'

export default function SnapScreen() {
  const [isPlantInfoReceived, setIsPlantInfoReceived] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState('null')

  const dispatch = useDispatch()

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

  const getPlantData = function(plantLabel) {
    return getPlantInfoQuerry(plantLabel)
  }

  const onPictureSaved = photo => {
    const ipAddressOfServer = '172.17.23.197' // <--- PUT YOUR OWN IP HERE
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
        console.log(response.data.commonName)
        // if (response.data.score < 0.5) { throw(new Error) }
        setIsPlantInfoReceived(true)

        console.log('getPlantData', getPlantData(response.data.commonName))
        console.log(location)

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

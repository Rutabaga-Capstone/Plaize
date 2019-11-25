import React from 'react'
import {Text, View, SafeAreaView} from 'react-native'
import Map from '../components/Map'
import Plants from '../components/Plants'

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
    title: 'Fullstack Academy'
  },
  {
    coordinate: {latitude: 41.896461, longitude: -87.641228},
    title: 'Starbucks'
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
    pins: []
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} pins={pins} />
      </SafeAreaView>
    )
  }
}

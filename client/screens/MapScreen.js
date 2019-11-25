import React from 'react'
import {Text, View, SafeAreaView} from 'react-native'
import Map from '../components/Map'
import Plants from '../components/Plants'

// A placeholder until we get our own location
const region = {
  latitude: 41.895506,
  longitude: -87.639014,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

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
      <View>
        <SafeAreaView style={styles.container}>
          <Map region={region} places={this.state.pins} />
        </SafeAreaView>
        <View>
          <Plants />
        </View>
      </View>
    )
  }
}

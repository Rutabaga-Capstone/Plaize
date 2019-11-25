import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 41.89541,
            longitude: -87.639024,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    )
  }
}

// console.log('hi')
// console.log(MapView)
// const Marker = MapView.Marker

// const styles = {
//   container: {
//     width: '100%',
//     height: '80%'
//   }
// }

// export default class Map extends Component {
//   renderMarkers() {
//     return this.props.places.map((place, i) => (
//       <Marker key={i} title={place.name} coordinate={place.coords} />
//     ))
//   }

//   render() {
//     const {region} = this.props
//     return (
//       <MapView
//         style={styles.container}
//         region={region}
//         showsUserLocation
//         showsMyLocationButton
//       >
//         {this.renderMarkers()}
//       </MapView>
//     )
//   }
// }

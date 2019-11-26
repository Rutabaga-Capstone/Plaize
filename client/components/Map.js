import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
  }
})

export default class Map extends React.Component {
  renderMarkers() {
    return this.props.pins.map((pin, i) => (
      <Marker
        key={i}
        title={pin.title}
        coordinate={pin.coordinate}
        pinColor={pin.isPoisonous ? 'yellow' : 'green'}
        description={pin.description}
      />
    ))
  }

  render() {
    return (
      <MapView
        style={styles.mapStyle}
        region={this.props.region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {this.renderMarkers()}
        <Circle
          radius={500}
          center={this.props.region}
          fillColor={'rgba(123,239,178,.25)'}
        />
      </MapView>
    )
  }
}

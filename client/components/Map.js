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
  render() {
    return (
      <View>
        {this.props.center && (
          <MapView
            style={styles.mapStyle}
            region={this.props.region}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {this.props.pins.map((pin, i) => (
              <Marker
                key={i}
                title={pin.title}
                coordinate={pin.coordinate}
                pinColor={pin.hasPoisonousPlants ? 'red' : 'green'}
                description={pin.description}
              />
            ))}
            <Circle
              radius={this.props.radius}
              center={this.props.center.coords}
              fillColor={'rgba(123,239,178,.65)'}
              strokeColor="transparent"
            />
          </MapView>
        )}
      </View>
    )
  }
}

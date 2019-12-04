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

const Map = props => {
  return (
    <View>
      {props.center && (
        <MapView
          style={styles.mapStyle}
          region={props.region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {renderMarkers(props.pins) /* Where is this coming from? */}
          {/* {renderCircle()} */}
          <Circle
            radius={props.radius}
            center={props.center.coords}
            fillColor="rgba(123,239,178,.65)"
            strokeColor="transparent"
          />
        </MapView>
      )}
    </View>
  )
}

export default Map

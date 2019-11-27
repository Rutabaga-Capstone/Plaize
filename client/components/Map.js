import React from 'react'
import {View, Button, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, {
  Marker,
  Circle,
  AnimatedRegion,
  Animated
} from 'react-native-maps'
import GradientButton from 'react-native-gradient-buttons'

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
        {this.props.center &&
          this.props.location && (
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
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            top: '80%', //for center align
            alignSelf: 'flex-end' //for align to right
          }}
        >
          <GradientButton
            style={{
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center'
            }}
            onPressAction={() => console.log('hi')}
            textStyle={{fontSize: 18}}
            gradientBegin="red"
            gradientEnd="red"
            gradientDirection="diagonal"
            height={40}
            width={100}
            radius={4}
          >
            poisonous
          </GradientButton>
        </View>
      </View>
    )
  }
}

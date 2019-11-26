import React from 'react'
import {View, Text} from 'react-native'

export default function Plants(props) {
  console.log('props:', props)
  return (
    <View>
      {props.pins.map((pin, i) => (
        <Text key={i}>
          Common Name={pin.plants.commonName}
          Scientific Name={pin.plants.scientificName}
          Poisonous or Nonpoisonous={pin.isPoisonous}
        </Text>
      ))}
    </View>
  )
}

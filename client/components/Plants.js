import React from 'react'
import {View, Text} from 'react-native'

export default function Plants(props) {
  console.log('pins:', props.pins)
  return (
    <View>
      {props.pins.map((pin, i) => (
        <Text key={i}>
          Pin = {pin.title}
          {pin.plants.map((plant, j) => (
            <Text key={j}>
              Common Name = {plant.commonName}
              Scientific Name = {plant.scientificName}
              Type = {plant.isPoisonous ? 'Poisonous' : 'Nonpoisonous'}
            </Text>
          ))}
        </Text>
      ))}
    </View>
  )
}

import React from 'react'
import {View, Text} from 'react-native'

export default function Plants(props) {
  return (
    <View>
      {props.plants.map((plant, i) => (
        <Text key={i}>
          Common Name={plant.commonName}
          Scientific Name={plant.scientificName}
          Poisonous or Nonpoisonous={plant.isPoisonous}
          Pin Id={plant.pin.id}
        </Text>
      ))}
    </View>
  )
}

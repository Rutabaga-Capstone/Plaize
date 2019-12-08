import React from 'react'
import {Image, TouchableHighlight, Text} from 'react-native'
import plants from './plants.json'

const RenderImages = ({navigation}) => {
  const {navigate} = navigation
  return (
    <>
      {plants.slice(0, 8).map((p, i) => (
        <TouchableHighlight key={i} onPress={() => navigate('PlantInfo', p)}>
          <Image
            style={{
              width: 80,
              height: 80,
              marginRight: 20,
              marginBottom: 5,
              borderRadius: 40,
              marginLeft: 20
            }}
            source={{uri: p.imageURL}}
          />
        </TouchableHighlight>
      ))}
    </>
  )
}

export default RenderImages

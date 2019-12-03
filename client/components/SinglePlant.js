import React, {useEffect, useState} from 'react'
import MapView, {Marker, Circle} from 'react-native-maps'
import styled from 'styled-components'

import {
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  FlatList,
  List,
  ActivityIndicator,
  Dimensions
} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import {setSinglePlant} from '../store/actions'

import pinsData from '../store/pins' //fake data for now

export default function SinglePlant(props) {
  const dispatch = useDispatch()

  const singlePlantReducer = useSelector(state => state.singlePlantReducer)
  const {singlePlant} = singlePlantReducer

  useEffect(() => getPlant(), [])

  const getPlant = pin => {
    let plant = pin.plants[0]
    dispatch(setSinglePlant(plant))
  }
  console.log('props in SinglePlant', props)
  return (
    <View>
      <Text>hello from SinglePlant</Text>
    </View>
  )
}

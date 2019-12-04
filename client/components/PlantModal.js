import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  FlatList,
  List,
  ActivityIndicator,
  Platform,
  Text,
  Image
} from 'react-native'
import * as Icon from '@expo/vector-icons'
import SinglePlant from './SinglePlant'

import {useDispatch, useSelector} from 'react-redux'

import {setPinSelected} from '../store/actions'

const screenHeight = Dimensions.get('window').height

// const dispatch = useDispatch()

export default function PlantModal(props) {
  const [top, setTop] = useState(new Animated.Value(900))
  const pinSelected = useSelector(state => state.pinSelected)
  console.log('pinSelected', pinSelected)

  useEffect(() => toggleModal(), [])
  useEffect(() => closeModal(), [])

  const toggleModal = () => {
    Animated.spring(top, {
      toValue: 174
    }).start()
  }

  const closeModal = () => {
    Animated.spring(top, {
      toValue: screenHeight
    }).start()
    if (props.disableModalCallback) {
      props.disableModalCallback()
    }
  }

  return (
    <Container>
      {pinSelected &&
        pinSelected.plants && (
          <AnimatedContainer style={{top: top}}>
            <Header>
              {pinSelected.plants.map((plant, i) => (
                <Text key={i} style={styles.title}>
                  {' '}
                  {plant.commonName}{' '}
                </Text>
              ))}
              <Image
                source={require('../assets/images/poison-oak.png')}
                style={styles.welcomeImage}
              />
            </Header>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                position: 'absolute',
                top: -80,
                right: '-5%',
                marginLeft: -22,
                zIndex: 1
              }}
            >
              <CloseView style={{elevation: 10}}>
                <Icon.Ionicons name="ios-close" size={44} color="#6cc7bd" />
              </CloseView>
            </TouchableOpacity>
            <Body>
              {pinSelected.plants.map((plant, i) => (
                <View key={i} style={styles.subtitle}>
                  <Text style={styles.screenText}>
                    {' '}
                    {plant.isPoisonous ? (
                      <Image
                        source={require('../assets/images/poisonous2.png')}
                        style={styles.poisonImage}
                      />
                    ) : (
                      'Nonpoisonous'
                    )}
                  </Text>
                </View>
              ))}
              {pinSelected.plants.map((plant, i) => (
                <View key={i} style={styles.subtitle}>
                  <Text style={styles.subtitle}>Scientific Name</Text>
                  <Text style={styles.screenText}>{plant.scientificName}</Text>
                </View>
              ))}
              {pinSelected.plants.map((plant, i) => (
                <View key={i} style={styles.subtitle}>
                  <Text style={styles.subtitle}>Description</Text>
                  <Text style={styles.screenText}>{plant.description}</Text>
                </View>
              ))}
            </Body>
          </AnimatedContainer>
        )}
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  background: transparent;
  width: 100%;
  height: 100%;
  z-index: 100;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Header = styled.View`
  background: #6cc7bd;
  height: 250px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Body = styled.View`
  background: #fff;
  height: ${screenHeight};
  border-left-width: 1px;
  border-right-width: 1px;
  border-right-color: lightgrey;
  border-left-color: lightgrey;
`

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  margin-top: 60;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`
const styles = StyleSheet.create({
  alert: {
    backgroundColor: 'grey'
  },
  welcomeContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginTop: -15,
    alignSelf: 'center',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  poisonImage: {
    width: 200,
    height: 75,
    resizeMode: 'contain',
    backgroundColor: 'white',
    marginTop: 0
  },
  plantDetails: {
    flex: 1,
    flexDirection: 'column', //try change this line
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'yorkten'
  },
  titleTwo: {
    marginTop: 30,
    color: '#000000',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'yorkten'
  },
  subtitle: {
    color: '#000',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginRight: 0,
    marginLeft: 0,
    marginTop: 5,
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  screenText: {
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  }
})

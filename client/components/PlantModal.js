import React from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import {closeModal} from '../store/actions'
import SinglePlant from './SinglePlant'

const screenHeight = Dimensions.get('window').height

// const dispatch = useDispatch()

class CustomModal extends React.Component {
  state = {
    top: new Animated.Value(900)
  }

  componentDidMount() {
    this.toggleModal()
  }

  // export default function PlantModal(props)

  toggleModal = () => {
    Animated.spring(this.state.top, {
      toValue: 174
    }).start()
  }

  closeModal = () => {
    Animated.spring(this.state.top, {
      toValue: screenHeight
    }).start()
    // dispatch(closeModal('closeModal'))
  }

  render(props) {
    return (
      <Container>
        <AnimatedContainer style={{top: this.state.top}}>
          <Header>
            {this.props.pinSelected.plants.map((plant, i) => (
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
            onPress={this.closeModal}
            style={{
              position: 'absolute',
              top: 120,
              left: '50%',
              marginLeft: -22,
              zIndex: 1
            }}
          >
            <CloseView style={{elevation: 10}}>
              <Icon.Ionicons name="ios-close" size={44} color="#6cc7bd" />
            </CloseView>
          </TouchableOpacity>
          <Body />
        </AnimatedContainer>
      </Container>
    )
  }
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
`

const Body = styled.View`
  background: #fff;
  height: ${screenHeight};
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
    marginTop: 20,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
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
    color: '#C7CAD4',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginRight: 0,
    marginLeft: 0,
    marginTop: 5,
    fontSize: 20,
    marginBottom: 35
  },
  screenText: {
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default CustomModal

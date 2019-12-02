import SinglePlant from './SinglePlant'
import React from 'react'
import styled from 'styled-components'
import {Animated, TouchableOpacity, Dimensions} from 'react-native'
import * as Icon from '@expo/vector-icons'
import {useDispatch, useSelector} from 'react-redux'
import {closeModal} from '../store/actions'

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

  render() {
    return (
      <Container>
        <AnimatedContainer style={{top: this.state.top}}>
          <Header />
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
  height: 150px;
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
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`

export default CustomModal

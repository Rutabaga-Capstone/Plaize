import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  leafIcon: {
    transform: [{rotateY: '180deg'}]
  },
  container: {
    backgroundColor: 'transparent',
    marginTop: 400,
    marginLeft: 190,
    position: 'absolute'
  },
  welcomeMessage: {
    textAlign: 'center',
    marginTop: '6%'
  }
})

export default styles

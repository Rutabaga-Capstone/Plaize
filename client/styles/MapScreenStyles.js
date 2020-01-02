import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0
  },
  topNav: {
    position: 'absolute',
    top: 0,
    zIndex: 10000000
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    marginTop: 0
  }
})

export default styles

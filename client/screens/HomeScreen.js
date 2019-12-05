import * as WebBrowser from 'expo-web-browser'
import React, {useState, useEffect} from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import {useDispatch} from 'react-redux'
import {getPlants, getUserData, setUserData} from '../store/actions'
import {Input} from 'react-native-elements'
import GradientButton from 'react-native-gradient-buttons'
import {withApollo} from 'react-apollo'
import {useApolloClient} from '@apollo/react-hooks'
import {CHECK_USER_EXISTS} from '../constants/GqlQueries'
import Dialog from 'react-native-dialog'
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth'

const HomeScreen = props => {
  const {navigate} = props.navigation
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlants())
  }, [])

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  const loginUser = async () => {
    const {client, navigation} = props
    if ([email, password].every(i => i && i.trim())) {
      try {
        const result = await client.query({
          query: CHECK_USER_EXISTS,
          variables: {
            email,
            password
          }
        })
        const userData = result.data.user
        dispatch(setUserData(userData))
        // await AsyncStorage.setItem('LOGGED_IN_USER', userData.email)
        navigation.navigate('Snap', userData)
      } catch (error) {
        setShowAlert(true)
        setAlertMsg('Invalid username or password!')
      }
    } else {
      setShowAlert(true)
      setAlertMsg('All fields are required!')
    }
  }

  const toggleAlert = () => {
    let newAlertStatus = !showAlert
    setShowAlert(newAlertStatus)
  }

  const loginWithFb = async () => {
    const {navigation} = props
    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(
        '2554828281464536'
      )
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email`
        )
        const userData = await response.json()
        userData.leaves = userData.leaves ? userData.leaves : 0
        await AsyncStorage.setItem('LOGGED_IN_USER', JSON.stringify(userData))
        navigation.navigate('Snap')
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const loginWithGoogle = async () => {
    const {navigation} = props
    try {
      const {type, user} = await Google.logInAsync({
        iosClientId: `238915439539-85p433631088kebf5606i7o1s44gil2d.apps.googleusercontent.com`,
        scopes: ['profile', 'email']
      })
      if (type === 'success') {
        user.leaves = user.leaves ? user.leaves : 0
        await AsyncStorage.setItem('LOGGED_IN_USER', JSON.stringify(user))
        navigation.navigate('Snap')
      } else {
        alert(JSON.stringify('something elseee'))
      }
    } catch (err) {
      alert('errrrrrrrr' + JSON.stringify(err))
    }
  }

  return (
    <View style={{alignItems: 'center', alignSelf: 'stretch', flex: 1}}>
      <Dialog.Container visible={showAlert}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>{alertMsg}</Dialog.Description>
        <Dialog.Button label="OK" onPress={toggleAlert} />
      </Dialog.Container>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/logo-gradient.png')
                : require('../assets/images/logo-gradient.png')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.title}>Plaze</Text>
          <Text style={styles.subtitle}>Identify Poisonous Plants</Text>
          <Input
            autoCompleteType="email"
            onChangeText={v => setEmail(v)}
            style={styles.label}
            placeholder="Email Address"
            autoCapitalize="none"
          />
          <Input
            secureTextEntry={true}
            onChangeText={v => setPassword(v)}
            style={styles.label}
            placeholder="password"
            autoCapitalize="none"
          />

          <GradientButton
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center'
            }}
            textStyle={{fontSize: 18}}
            gradientBegin="#6CC7BD"
            gradientEnd="#A5D38F"
            gradientDirection="diagonal"
            height={40}
            width={215}
            radius={0}
            onPressAction={loginUser}
          >
            login
          </GradientButton>
          <Text style={styles.screenText}>I forgot my password</Text>
          <Text style={styles.titleTwo}>New to Plaze?</Text>

          <GradientButton
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center'
            }}
            onPressAction={() => navigate('CreateAccount')}
            textStyle={{fontSize: 18}}
            gradientBegin="#6CC7BD"
            gradientEnd="#A5D38F"
            gradientDirection="diagonal"
            height={40}
            width={215}
            radius={0}
          >
            create account
          </GradientButton>

          <Text style={styles.screenTextBottom}>Create Account With</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{width: 100, height: 50, marginTop: 5, marginLeft: 36}}
            >
              <TouchableOpacity onPress={loginWithFb}>
                <Text style={{fontSize: 18, color: '#6CC7BD'}}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 100, height: 50, marginTop: 5}}>
              <TouchableOpacity onPress={loginWithGoogle}>
                <Text style={{fontSize: 18, color: '#6CC7BD'}}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    )
    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    )
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    )
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  )
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  )
}

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
    width: 80,
    height: 80,
    marginLeft: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 5,
    marginBottom: 0,
    color: '#000000',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'yorkten'
  },
  titleTwo: {
    marginTop: 10,
    color: '#000000',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'yorkten'
  },
  subtitle: {
    color: '#C7CAD4',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginRight: 0,
    marginLeft: 0,
    marginTop: 5,
    fontSize: 15,
    marginBottom: 5
  },
  screenText: {
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 18,
    textAlign: 'center'
  },
  screenTextBottom: {
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 18,
    textAlign: 'center'
  },
  socialContainer: {},
  socialColumn: {
    width: '50%' // 50% of container width
  },
  socialLinks: {
    color: '#6CC7BD',
    fontSize: 18
  },
  label: {
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#6CC7BD'
  },
  container: {
    alignSelf: 'stretch'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30,
    flex: 1,
    textAlign: 'center'
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})

export default withApollo(HomeScreen)

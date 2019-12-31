import * as WebBrowser from 'expo-web-browser'
import React from 'react'
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
import {Input} from 'react-native-elements'
import {withApollo} from 'react-apollo'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_USER} from '../constants/GqlMutations'
import {gql} from 'apollo-boost'
import GradientButton from 'react-native-gradient-buttons'
import Dialog from 'react-native-dialog'
import {v1 as uuid} from 'uuid'
import styles from '../styles/CreateAccountStyles'

/*
    id: ID
    name: String!
    email: String!
    password: String!
    plants: [Plant!]! @relation(name: "FOUND", direction: "OUT")
    location: Location
    pins: [Pin!] @relation(name: "CREATED", direction: "OUT")
    deviceIds: [String!]
    isLoggedIn: Boolean
    leaves: Int!
    */
class CreateAccount extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    leaves: 0,
    showAlert: false,
    alertMsg: ''
  }

  createUser = async () => {
    const {client, navigation} = this.props
    const {navigate} = navigation
    const {name, email, password, confirmPassword, leaves} = this.state
    if ([name, email, password, confirmPassword].every(f => f.trim())) {
      if (password === confirmPassword) {
        try {
          const result = await client.mutate({
            mutation: CREATE_USER,
            variables: {
              id: uuid(),
              name,
              email,
              password,
              leaves,
              regDate: new Date()
            }
          })
          const userData = result.data.CreateUser
          await AsyncStorage.setItem('LOGGED_IN_USER', JSON.stringify(userData))
          navigate('Snap')
        } catch (err) {
          this.setState({
            showAlert: true,
            alertMsg: 'Must fill out all required fields!'
          })
        }
      } else {
        this.setState({showAlert: true, alertMsg: 'Passwords must match!'})
        // alert('Passwords must match!')
      }
    } else {
      this.setState({
        showAlert: true,
        alertMsg: 'Must fill out required fields!'
      })
      // alert('Must fill out required fields!')
    }
  }

  toggleAlert = () =>
    this.setState(prevState => ({showAlert: !prevState.showAlert}))

  render() {
    const {navigate} = this.props.navigation
    const {showAlert, alertMsg} = this.state
    return (
      <View style={{alignItems: 'center', alignSelf: 'stretch', flex: 1}}>
        <Dialog.Container visible={showAlert}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description>{alertMsg}</Dialog.Description>
          <Dialog.Button label="OK" onPress={this.toggleAlert} />
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
            <Text style={styles.subtitle}>create an account</Text>

            <Input
              style={styles.label}
              onChangeText={v => this.setState({name: v})}
              placeholder="Name"
              autoCapitalize="none"
            />
            <Input
              style={styles.label}
              onChangeText={v => this.setState({email: v})}
              placeholder="Email Address"
              autoCapitalize="none"
            />
            <Input
              secureTextEntry={true}
              style={styles.label}
              onChangeText={v => this.setState({password: v})}
              placeholder="Password"
              autoCapitalize="none"
            />
            <Input
              secureTextEntry={true}
              style={styles.label}
              onChangeText={v => this.setState({confirmPassword: v})}
              placeholder="Confirm Password"
              autoCapitalize="none"
            />

            <GradientButton
              style={{
                marginTop: 10,
                textAlign: 'center',
                marginBottom: 10
              }}
              textStyle={{fontSize: 18}}
              gradientBegin="#6CC7BD"
              gradientEnd="#A5D38F"
              gradientDirection="diagonal"
              height={40}
              width={200}
              radius={0}
              onPressAction={this.createUser}
            >
              register
            </GradientButton>
          </View>
          <Text style={styles.login}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('Home')}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                color: '#6CC7BD',
                textAlign: 'center'
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

CreateAccount.navigationOptions = {
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

// const styles = StyleSheet.create({
//   login: {
//     fontSize: 18,
//     textAlign: 'center'
//   },
//   title: {
//     marginTop: 5,
//     marginBottom: 0,
//     color: '#000000',
//     textAlign: 'center',
//     fontSize: 40,
//     fontFamily: 'yorkten'
//   },
//   subtitle: {
//     color: '#C7CAD4',
//     textAlign: 'center',
//     alignSelf: 'stretch',
//     marginRight: 0,
//     marginLeft: 0,
//     marginTop: 5,
//     fontSize: 15,
//     marginBottom: 5
//   },
//   screenText: {
//     marginTop: 15,
//     color: '#000000',
//     fontFamily: 'yorkten',
//     fontSize: 12,
//     justifyContent: 'center'
//   },
//   socialLinks: {
//     color: '#6CC7BD',
//     fontSize: 18
//   },
//   label: {
//     borderWidth: 1,
//     marginTop: 20,
//     marginBottom: 20
//   },
//   button: {
//     backgroundColor: '#6CC7BD'
//   },
//   welcomeImage: {
//     width: 80,
//     height: 80,
//     marginLeft: 10,
//     resizeMode: 'contain',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   container: {
//     alignSelf: 'stretch'
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center'
//   },
//   contentContainer: {
//     paddingTop: 30,
//     flex: 1,
//     marginHorizontal: 80
//   },
//   welcomeContainer: {
//     marginTop: 30,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   homeScreenFilename: {
//     marginVertical: 7
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)'
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center'
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: {width: 0, height: -3},
//         shadowOpacity: 0.1,
//         shadowRadius: 3
//       },
//       android: {
//         elevation: 20
//       }
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center'
//   },
//   navigationFilename: {
//     marginTop: 5
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center'
//   },
//   helpLink: {
//     paddingVertical: 15
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7'
//   }
// })

export default withApollo(CreateAccount)

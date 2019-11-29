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
import {gql} from 'apollo-boost'
import GradientButton from 'react-native-gradient-buttons'

class CreateAccount extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  createUser = async () => {
    const {client, navigation} = this.props
    const {navigate} = navigation
    const {
      firstName,
      lastName,
      middleName,
      email,
      password,
      confirmPassword
    } = this.state
    if (
      [firstName, lastName, email, password, confirmPassword].every(f =>
        f.trim()
      )
    ) {
      if (password === confirmPassword) {
        try {
          const result = await client.mutate({
            mutation: gql`
              mutation CreateUser(
                $firstName: String!
                $lastName: String!
                $middleName: String!
                $email: String!
                $password: String!
              ) {
                CreateUser(
                  firstName: $firstName
                  lastName: $lastName
                  middleName: $middleName
                  email: $email
                  password: $password
                ) {
                  _id
                  firstName
                  middleName
                  lastName
                  email
                }
              }
            `,
            variables: {
              firstName,
              lastName,
              middleName,
              email,
              password
            }
          })
          const userData = result.data.CreateUser
          await AsyncStorage.setItem('LOGGED_IN_USER', userData.email)
          navigate('Snap', userData)
        } catch (err) {
          alert(JSON.stringify(err))
        }
      } else {
        alert('Passwords must match!')
      }
    } else {
      alert('Must fill out required fields!')
    }
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={{alignItems: 'center', alignSelf: 'stretch', flex: 1}}>
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
              onChangeText={v => this.setState({firstName: v})}
              placeholder="First name"
              autoCapitalize="none"
            />
            <Input
              style={styles.label}
              onChangeText={v => this.setState({middleName: v})}
              placeholder="Middle Name / Initial"
              autoCapitalize="none"
            />
            <Input
              style={styles.label}
              onChangeText={v => this.setState({lastName: v})}
              placeholder="Last Name"
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

            <Text style={styles.screenText}>
              *By tapping Register, you acknowledge that you have read the
              Privacy Policy and agree to the Terms of Service. We'll send you a
              message to verify this number. Messaging rates may apply.
            </Text>

            <GradientButton
              style={{
                marginTop: 20,
                textAlign: 'center',
                marginBottom: 20
              }}
              textStyle={{fontSize: 18}}
              gradientBegin="#6CC7BD"
              gradientEnd="#A5D38F"
              gradientDirection="diagonal"
              height={50}
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
  //footer: null
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
  login: {
    fontSize: 18,
    textAlign: 'center'
  },
  title: {
    marginTop: 30,
    color: '#000000',
    textAlign: 'center',
    fontSize: 40,
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
    marginBottom: 15
  },
  screenText: {
    marginTop: 15,
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 12,
    justifyContent: 'center'
  },
  socialLinks: {
    color: '#6CC7BD',
    fontSize: 18
  },
  label: {
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#6CC7BD'
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
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
    marginHorizontal: 80
  },
  welcomeContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
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

export default withApollo(CreateAccount)

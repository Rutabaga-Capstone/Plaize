import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native'
import {withApollo} from 'react-apollo'
import {Ionicons} from '@expo/vector-icons'

class ProfileScreen extends React.Component {
  state = {
    email: '',
    password: ''
  } // so now we're gonna pull from master, right? to merge. yeah

  async componentDidMount() {
    try {
      const userName = await AsyncStorage.getItem('USER_NAME')
    } catch (err) {
      console.log('err fetching user', err)
    }
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={{alignItems: 'center', alignSelf: 'stretch', flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Welcome Container */}

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/profile-icon.png')
                  : require('../assets/images/profile-icon.png')
              }
              style={styles.welcomeImage}
            />
            <Text style={styles.title}>Dynamic Username</Text>

            {/* Rank Level, Rank Number Container */}

            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  width: '47%',
                  height: 50,
                  textAlign: 'right',
                  fontSize: 24
                }}
              >
                Rank-Level
              </Text>
              <Text
                style={{
                  width: '6%',
                  height: 50,
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#C7CAD4'
                }}
              >
                <Ionicons name="ios-leaf" color="#6CC7BD" size={25} />
              </Text>
              <Text
                style={{
                  width: '47%',
                  height: 50,
                  textAlign: 'left',
                  fontSize: 24
                }}
              >
                Rank-Number
              </Text>
            </View>

            {/* Joined Plaze on JoinDate Row */}

            <Text style={styles.subtitle}>Joined Plaze on JoinDate</Text>

            <View
              style={{
                flex: 1
              }}
            />

            {/* Parent Container View For Plants, Map */}
            <View
              style={{
                flex: 1
              }}
            >
              {/* Poisonous Plants Identified Container */}

              <View
                style={{
                  flex: 2,
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    width: '6%',
                    height: 50,
                    textAlign: 'center',
                    fontSize: 24,
                    color: '#C7CAD4'
                  }}
                />
                <Text
                  style={{
                    width: '60%',
                    height: 50,
                    textAlign: 'left',
                    fontSize: 20,
                    color: '#000000',
                    marginLeft: 10
                  }}
                >
                  Poisonous Plants Identified:
                </Text>
                <Text
                  style={{
                    width: '34%',
                    height: 50,
                    textAlign: 'left',
                    fontSize: 24
                  }}
                >
                  {/* Blank Placeholder */}
                </Text>
              </View>

              {/* Plaze Map Container */}
            </View>
          </View>
          {/* End Parent Container View */}
        </ScrollView>
      </View>
    )
  }
}

ProfileScreen.navigationOptions = {
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
  heading: {
    textAlign: 'left',
    marginLeft: -60
  },
  alert: {
    backgroundColor: 'grey'
  },
  welcomeContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 20,
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
    marginTop: 40,
    fontSize: 16,
    marginBottom: 35
  },
  screenText: {
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
    marginTop: 30,
    marginBottom: 30
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

export default withApollo(ProfileScreen)

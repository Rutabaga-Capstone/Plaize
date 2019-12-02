import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'
import {Button, ThemeProvider, Input} from 'react-native-elements'

import * as Font from 'expo-font'
import {MonoText} from '../components/StyledText'
import GradientButton from 'react-native-gradient-buttons'
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component'

export default function HomeScreen(props) {
  const {navigate} = props.navigation
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
          <Text style={styles.subtitle}>Identify Poisonous Plants</Text>
          <Input style={styles.label} placeholder="username or email" />
          <Input
            style={styles.label}
            placeholder="password"
            secureTextEntry={true}
          />

          <GradientButton
            style={{
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center'
            }}
            textStyle={{fontSize: 18}}
            gradientBegin="#6CC7BD"
            gradientEnd="#A5D38F"
            gradientDirection="diagonal"
            height={50}
            width={200}
            radius={0}
            onPressAction={() => alert('You pressed me in login!')}
          >
            login
          </GradientButton>
          <Text style={styles.screenText}>I forgot my password</Text>
          <Text style={styles.title}>New to Plaze?</Text>

          <GradientButton
            style={{
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center'
            }}
            onPressAction={() => navigate('CreateAccount')}
            textStyle={{fontSize: 18}}
            gradientBegin="#6CC7BD"
            gradientEnd="#A5D38F"
            gradientDirection="diagonal"
            height={50}
            width={200}
            radius={0}
          >
            create account
          </GradientButton>

          <Text style={styles.screenText}>Create Account With</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{width: 100, height: 50, marginTop: 15, marginLeft: 36}}
            >
              <Text style={{fontSize: 18, color: '#6CC7BD'}}>Facebook</Text>
            </View>
            <View style={{width: 100, height: 50, marginTop: 15}}>
              <Text style={{fontSize: 18, color: '#6CC7BD'}}>Google</Text>
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
  welcomeContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
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

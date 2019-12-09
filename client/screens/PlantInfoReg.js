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
import {Ionicons, SimpleLineIcons, Feather} from '@expo/vector-icons'
import {GET_PLANT_BY_COMMON_NAME} from '../constants/GqlQueries'
import TopNavigation from '../components/TopNavigation'

class PlantInfo extends React.Component {
  state = {
    plant: {}
  }

  async componentDidMount() {
    const {client, navigation} = this.props
    const {commonName} = navigation.state.params
    try {
      const result = await client.query({
        query: GET_PLANT_BY_COMMON_NAME,
        variables: {
          commonName
        }
      })
      const {plant} = result.data
      this.setState({plant})
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  logoutUser = async () => {
    const {navigate} = this.props.navigation
    try {
      await AsyncStorage.removeItem('LOGGED_IN_USER')
      navigate('Home')
    } catch (err) {
      console.log('error removing item from storage', err)
    }
  }

  render() {
    let {
      commonName,
      scientificName,
      description,
      imageURL,
      poisonous
    } = this.state.plant

    imageURL =
      'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg'

    return (
      <View style={{alignSelf: 'stretch', flex: 1, marginTop: 0}}>
        {/* <View style={styles.fakeView} /> */}
        <TopNavigation {...this.props} style={styles.topNavOnPlantInfo} />
        {/* START UPPER-RIGHT X */}
        <View style={{flex: 0.1, flexDirection: 'row', marginTop: -10}}>
          <View
            style={{
              width: '33.3%',
              textAlign: 'left'
            }}
          />
          <View
            style={{
              width: '33.3%',
              textAlign: 'middle'
            }}
          />
          <View
            style={{
              width: '33.3%',
              textAlign: 'right'
            }}
          >
            <Text style={{textAlign: 'right', marginRight: 10, marginTop: 15}}>
              <Feather
                name="x"
                size={30}
                color="#C7CAD4"
                onPress={() => this.props.navigation.navigate('Snap')}
                //helloWorld
              />
            </Text>
          </View>
        </View>
        {/* END UPPER-RIGHT X */}

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Welcome Container */}
          <View style={styles.welcomeContainer}>
            <Image
              style={{
                width: 100,
                height: 100,
                marginBottom: 20,
                borderRadius: 50
              }}
              source={{uri: imageURL}}
            />
            <Text
              style={{fontFamily: 'yorkten', fontSize: 24, marginBottom: 12}}
            >
              {commonName}
            </Text>
            <Text
              style={{fontFamily: 'yorkten', fontSize: 18, marginBottom: 12}}
            >
              {scientificName}
            </Text>
            <Text>{description}</Text>
            <Text>{poisonous}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

PlantInfo.navigationOptions = {
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
  congratulations: {
    fontFamily: 'yorkten',
    fontSize: 22,
    color: '#6CC7BD',
    textAlign: 'center'
  },
  congratsMessage: {
    fontFamily: 'yorkten',
    fontSize: 14,
    color: '#000000',
    marginTop: 15,
    textAlign: 'left',
    width: '100%'
  },
  fakeView: {
    height: 88,
    borderBottomColor: '#C7CAD4',
    borderBottomWidth: 0.5
  },
  heading: {
    textAlign: 'left',
    marginLeft: -60
  },
  alert: {
    backgroundColor: 'grey'
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40
  },
  plantsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: 80,
    flex: 1
  },
  welcomeImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 50,
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

export default withApollo(PlantInfo)

//you need to charge your emulator, the battery is low :)

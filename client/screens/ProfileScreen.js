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
  TouchableHighlight
} from 'react-native'
import {withApollo} from 'react-apollo'
import {connect} from 'react-redux'
import {GET_USER_PROFILE_INFO} from '../constants/GqlQueries'
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import TopNavigation from '../components/TopNavigation'
import RenderImages from './TempImageRender'
import styles from '../styles/ProfileScreenStyles'

class ProfileScreen extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const {client} = this.props
    try {
      const {email} = JSON.parse(
        (await AsyncStorage.getItem('LOGGED_IN_USER')) || '{}'
      )
      const result = await client.query({
        query: GET_USER_PROFILE_INFO,
        variables: {
          email
        }
      })
      const {user} = result.data

      // Quick fix for demo
      // TODO: to be fixed properly
      let currentDate = new Date()
      let regDate =
        currentDate.getDate() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getFullYear()
      user.regDate = regDate

      this.setState({user})
    } catch (err) {
      console.log(err)
    }
  }

  getRankLevel = leaves => {
    let result = ''
    switch (true) {
      case leaves >= 0 && leaves <= 20:
        result = 'Novice'
        break
      case leaves > 20 && leaves <= 40:
        result = 'Explorer'
        break
      case leaves > 40:
        result = 'Expert'
        break
      default:
    }
    return result
  }

  render() {
    const {navigate} = this.props.navigation
    const {userPlants} = this.props.plantsReducer
    const {name, regDate, plants} = this.state.user

    const {leaves} = this.props.leavesReducer
    return (
      <View style={{alignItems: 'center', alignSelf: 'stretch', flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Welcome Container */}
          <View style={styles.welcomeContainer}>
            <TopNavigation {...this.props} />
            <Image
              source={
                __DEV__
                  ? require('../assets/images/profile-icon.png')
                  : require('../assets/images/profile-icon.png')
              }
              style={styles.welcomeImage}
            />
            <Text style={styles.title}>{name}</Text>
            {/* Rank Level, Rank Number Container */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  width: '50%',
                  height: 50,
                  textAlign: 'right',
                  fontSize: 24
                }}
              >
                {this.getRankLevel(leaves)}
              </Text>
              <Text
                style={{
                  width: '5%',
                  height: 50,
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#C7CAD4'
                }}
              >
                •
              </Text>
              <Text
                style={{
                  width: '5%',
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
                  width: '40%',
                  height: 50,
                  textAlign: 'left',
                  fontSize: 24
                }}
              >
                <Text> </Text>
                {leaves}
              </Text>
            </View>

            {/* Joined Plaze on JoinDate Row */}
            <Text style={styles.subtitle}>Joined Plaze on {regDate}</Text>

            <View
              style={{
                flex: 1,
                marginTop: -40
              }}
            />

            {/* PARENT Container View - Plants Text, Images, Map, etc */}
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between'
              }}
            >
              {/* 'Poisonous Plants Identified:' TEXT Container */}
              <View
                style={{
                  flex: 1,
                  marginBottom: 20
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
                  //Blank Placeholder
                />
                <Text
                  style={{
                    width: '100%',
                    height: 50,
                    textAlign: 'left',
                    fontSize: 20,
                    color: '#000000',
                    marginLeft: 25
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
              {/* End Row of 'Poisonous Plants Identified:' TEXT Container*/}

              {/* Start Row of Plant IMAGES */}
              <View style={styles.plantsContainer}>
                <View
                  style={{
                    flex: 1,
                    flexWrap: 'wrap'
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap'
                    }}
                  >
                    <RenderImages {...this.props} />
                  </View>
                </View>
              </View>
              {/* End Row of 'Poisonous Plants Identified' IMAGES*/}
            </View>
            <Text style={styles.plantText}>Poison Ivy</Text>
            {/* Plaze Map Container */}
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

export default connect(({plantsReducer, leavesReducer}) => ({
  plantsReducer,
  leavesReducer
}))(withApollo(ProfileScreen))

import React, {useState, useEffect} from 'react'
import {Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native'
import {withApollo} from 'react-apollo'
import {Feather} from '@expo/vector-icons'
import {GET_PLANT_BY_COMMON_NAME} from '../constants/GqlQueries'
import TopNavigation from '../components/TopNavigation'
import styles from '../styles/PlantInfoStyles'

function PlantInfo(props) {
  const [plant, setPlant] = useState('')

  useEffect(() => {
    const getPlantInfo = function() {
      const {client, navigation} = props
      const {commonName} = navigation.state.params
      client
        .query({
          query: GET_PLANT_BY_COMMON_NAME,
          variables: {
            commonName
          }
        })
        .then(({data: {plant}}) => setPlant(plant))
        .catch(err => console.error(err))
    }
    getPlantInfo()
  })

  return (
    <View style={{alignSelf: 'stretch', flex: 1, marginTop: 0}}>
      <TopNavigation {...props} />

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
              onPress={() => props.navigation.goBack()}
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
            source={{
              uri:
                'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg'
            }}
            // TODO: unhardcode URL
          />
          <Text style={{fontFamily: 'yorkten', fontSize: 24, marginBottom: 12}}>
            {plant.commonName}
          </Text>
          <Text style={{fontFamily: 'yorkten', fontSize: 18, marginBottom: 12}}>
            {plant.scientificName}
          </Text>
          <Text>{plant.description}</Text>
          <Text>{plant.poisonous}</Text>
          <Text style={styles.congratulations}>Congratulations!</Text>
          <Text style={styles.congratsMessage}>
            • You have identified your first plant!
            {`\n \n`}• You have ranked up from Novice to Explorer!
            {`\n \n`}• Increase your rank by earning more leaves
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

PlantInfo.navigationOptions = {
  header: null
}

export default withApollo(PlantInfo)

import React from 'react'
import {
  View,
  Text,
  Image,
  SectionList,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import {Card, ListItem, Button, Icon} from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    top: '10%',
    position: 'absolute',
    // flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: '#e5e5e5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginBottom: 10,
    marginTop: 5
  }
})

export default function Plants(props) {
  return (
    <View style={styles}>
      {/* <View> */}
      {props.pins.map((pin, i) => (
        <View key={i}>
          <Text key={i}>
            Pin = {pin.title}
            {pin.plants.map((plant, j) => (
              <Text key={j}>
                Common Name = {plant.commonName}
                Scientific Name = {plant.scientificName}
                Type = {plant.isPoisonous ? 'Poisonous' : 'Nonpoisonous'}
              </Text>
            ))}
          </Text>
        </View>
      ))}
    </View>
    // </Card>
  )
}

// export default function Plants(props) {
//   return (
//     <ScrollView>
//       <SectionList
//         sections={[
//           {
//             title: 'Username Starts with A',
//             data: ['Amit', 'Anand', 'Abhishek']
//           },
//           {title: 'Username Starts with B', data: ['Bikash', 'Bingo', 'Baby']},
//           {title: 'Username Starts with C', data: ['cat', 'cathy', 'Charan']},
//           {
//             title: 'Username Starts with D',
//             data: ['Deepak', 'Deepti', 'Dhananjay']
//           },
//           {title: 'Username Starts with F', data: ['Fatay', 'Fanny', 'Fresher']}
//         ]}
//         renderSectionHeader={({section}) => (
//           <Text style={styles.SectionHeader}> {section.title} </Text>
//         )}
//         renderItem={({item}) => (
//           <Text
//             style={styles.SectionListItemS}
//             // onPress={this.GetSectionListItem.bind(this, item)}
//           >
//             {' '}
//             {item}{' '}
//           </Text>
//         )}
//         keyExtractor={(item, index) => index}
//       />
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     top: '55%',
//     position: 'absolute',
//     flex: 3,
//     justifyContent: 'flex-start',
//     backgroundColor: '#e5e5e5',
//     width: Dimensions.get('window').width
//   },
//   SectionHeader: {
//     backgroundColor: '#64B5F6',
//     fontSize: 14,
//     padding: 2,
//     color: '#fff',
//     fontWeight: 'bold'
//   },
//   SectionListItemS: {
//     fontSize: 12,
//     padding: 4,
//     color: '#000',
//     backgroundColor: '#F5F5F5'
//   }
// })

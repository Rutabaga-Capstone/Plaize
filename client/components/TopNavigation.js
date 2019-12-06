import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserDataLeaves} from '../store/actions'
import {UPDATE_USER_LEAVES} from '../constants/GqlMutations'
// import {GET_USER_LEAVES} from '../constants/GqlQueries'

export default function TopNavigation() {
  const dispatch = useDispatch()

  const leavesReducer = useSelector(state => state.leavesReducer)
  const {leaves} = leavesReducer

  return (
    <View style={{flex: 0.07, flexDirection: 'row', marginTop: 15}}>
      <View
        style={{
          width: '33.3%',
          height: 40,
          textAlign: 'left',
          borderBottomColor: '#C7CAD4',
          borderBottomWidth: 1,
          marginBottom: 10,
          borderTopWidth: 0
        }}
      >
        <Text
          style={{
            textAlign: 'left',
            marginLeft: 15
          }}
        >
          <SimpleLineIcons
            name="logout"
            onPress={this.logoutUser}
            size={25}
            color="#C7CAD4"
            style={{
              textAlign: 'left'
            }}
          />
        </Text>
      </View>

      <View
        style={{
          width: '33.3%',
          height: 40,
          textAlign: 'middle',
          borderBottomColor: '#C7CAD4',
          borderBottomWidth: 1,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontFamily: 'yorkten',
            color: '#C7CAD4'
          }}
        >
          Plaze
        </Text>
      </View>

      <View
        style={{
          width: '33.3%',
          height: 40,
          textAlign: 'right',
          borderBottomColor: '#C7CAD4',
          borderBottomWidth: 1,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            textAlign: 'right',
            marginRight: 15
          }}
        >
          <Ionicons
            name="ios-leaf"
            size={25}
            style={{
              color: '#6CC7BD'
            }}
          />
          {leaves}
        </Text>
      </View>
    </View>
  )
}

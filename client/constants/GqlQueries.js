import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {useApolloClient} from 'apollo-client'

/* Frontend examples:
 * Use query once -- for on click or on callback i.e. when response from snapscreen
 * const client = useApolloClient()
 * returnedObject = client.query(THIS_IS_THE_QUERY, {variables: {'varName': 'varValue', commonName, etc}})
 *
 * Use query on componentRender -- refetch every .5 seconds, refetch on callback -- i.e. get user location
 * const {loading, error, data, refetch} = useQuery(
 *   QUERY_VAR_HERE, {
 *     variables: {
 *       something,
 *       'something': 'else'
 *     },
 *   pollInterval: 500,
 * })
 * <button onClick={() => refetch()}>Click to update data</button>
 */

export const CHECK_USER_EXISTS = gql`
  query logInUser($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      id
      name
      email
      leaves
      regDate {
        formatted
      }
    }
  }
`

export const GET_USER_PROFILE_INFO = gql`
  query getUserProfileInfo($email: String!) {
    user(email: $email) {
      name
      email
      leaves
      plants {
        commonName
        scientificName
        imageURL
        description
        isPoisonous
      }
    }
  }
`

export const GET_ALL_USER_INFO = gql`
  query getAllUserInfo($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      name
      email
      leaves
      plants {
        commonName
        scientificName
        imageURL
        description
        isPoisonous
      }
      lat
      lng
    }
  }
`

export const GET_USER_LEAVES = gql`
  query getUserLeaves($email: String!) {
    user(email: $email) {
      leaves
    }
  }
`

export const GET_PLANT_BY_COMMON_NAME = gql`
  query getPlantByCommonName($commonName: String!) {
    plant(commonName: $commonName) {
      commonName
      scientificName
      description
      imageURL
      isPoisonous
    }
  }
`

export const GET_ALL_PINS = gql`
  query {
    Pin {
      lat
      lng
      plants {
        commonName
      }
    }
  }
`

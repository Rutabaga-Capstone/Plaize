import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

export const CHECK_USER_EXISTS = gql`
  query logInUser($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      _id
      name
    }
  }
`

export const GET_ALL_USER_INFO = gql`
  query getAllUserInfo($email: String!) {
    user(email: $email, password: $password) {
      name
      email
      leaves
      plants {
        commonName
        scientificName
        imageURL
        description
        poisonous
      }
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
      poisonous
    }
  }
`

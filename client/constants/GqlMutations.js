import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

/*Frontend examples:
Keep in mind useMutation does not do a mutation automatically, but rather returns
a *mutate* function to be used at your leisure. Use useQuery to keep state updated
if necessary, or update redux with data
const [createUser, {data}] = useMutation(MUTATION_NAME_HERE)
<button onClick={() => createUser({
  variables: {
    'some': 'var',
    you,
    'need': 'to',
    pass,
    in
  }
})}
>
Click to Mutate
</button>
<h2>this is the {data} received as a whole object. {data.name + data.email} is the name and email</h2>
*/

export const CREATE_USER = gql`
  mutation createUser(
    $id: ID!
    $email: String!
    $password: String!
    $name: String!
  ) {
    CreateUser(
      id: $id
      email: $email
      password: $password
      name: $name
      leaves: 0
    ) {
      name
      email
      id
      leaves
    }
  }
`

// spread the plant and add user info, generate 2 id's and pass them as pinId and plantId
export const CREATE_PIN_PLANT = gql`
  mutation createPinPlant(
    $commonName: String!
    $scientificName: String!
    $description: String!
    $imageURL: String!
    $isPoisonous: Boolean!
    $pinId: ID!
    $plantId: ID!
    $lat: Float!
    $lng: Float!
  ) {
    CreatePlant(
      id: $plantId
      commonName: $commonName
      scientificName: $scientificName
      description: $description
      imageURL: $imageURL
      isPoisonous: $isPoisonous
    ) {
      id
      commonName
      scientificName
      description
      imageURL
      isPoisonous
    }
    CreatePin(id: $pinId, lat: $lat, lng: $lng) {
      id
      lat
      lng
      plants {
        id
        commonName
        scientificName
        description
        imageURL
        isPoisonous
      }
    }
  }
`

export const ADD_PIN_PLANT_TO_USER = gql`
  mutation addPinPlantToUser($pinId: ID!, $plantId: ID!, $userId: ID!) {
    AddUserPlants(from: {id: $userId}, to: {id: $plantId}) {
      from {
        name
      }
      to {
        commonName
      }
    }
    AddUserPins(from: {id: $userId}, to: {id: $pinId}) {
      from {
        name
      }
      to {
        lat
        lng
      }
    }
    AddPinPlants(from: {id: $pinId}, to: {id: $plantId}) {
      from {
        id
      }
      to {
        id
      }
    }
  }
`

export const UPDATE_USER_LEAVES = gql`
  mutation updateUserLeaves($id: ID!, $leaves: Int!) {
    UpdateUser(id: $id, leaves: $leaves) {
      leaves
    }
  }
`

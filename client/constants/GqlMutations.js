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

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    CreateUser(email: $email, password: $password, name: $name, leaves: 0) {
      name
      email
      _id
      leaves
    }
    UpdateUser
  }
`

// spread the plant and add user info
const ADD_PIN_AND_PLANT_TO_USER = gql`
  mutation addPinAndPlantToUser(
    $commonName: String!
    $scientificName: String!
    $description: String!
    $imageURL: String!
    $poisonous: Boolean!
    $email: String!
    $lat: Float!
    $lng: Float!
  ) {
    CreatePlant(
      commonName: $commonName
      scientificName: $scientificName
      description: $description
      imageURL: $imageURL
      poisonous: $poisonous
    ) {
      _id
      commonName
      scientificName
      description
      imageURL
      poisonous
    }
    CreatePin(lat: $lat, lng: $lng) {
      _id
      lat
      lng
    }
  }
`

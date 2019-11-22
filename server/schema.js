const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createPin(
      user: User
      plants: [Plant!]!
      location: Location!
      notes: [Note]
    ): Pin!
    user(id: ID): User!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Plant {
    id: ID!
    commonName: String
    scientificName: String!
    imageURL: String!
    description: String!
    poisonous: Bool!
    notes: [Note!]!
  }

  type User {
    id: ID!
    username: String!
    plants: [Plant!]!
    location: Location!
    pins: [Pin!]!
    notes: [Note!]!
  }

  type Pin {
    id: ID!
    location: Location!
    plants: [Plant!]!
    notes: [Note!]
  }

  type Note {
    id: ID!
    plant: Plant
    user: User
    pin: Pin
  }
`
module.exports = {typeDefs}

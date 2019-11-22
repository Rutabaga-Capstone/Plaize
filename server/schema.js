const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
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
    user: User.username!
    pin: Pin
  }

`
module.exports = {typeDefs}

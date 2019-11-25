const {neo4jgraphql} = require('neo4j-graphql-js')
const {gql} = require('apollo-server')

// type Mutation {
//   createPin(
//     user: User
//     plants: [Plant!]!
//     location: Location!
//     notes: [Note]
//   ): Pin!
//   user(id: ID): User!
// }

const typeDefs = gql`
  type Query {
    user(id: ID, username: String): User
    location(lat: Float!, lng: Float!): Location
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
    poisonous: Boolean!
  }

  type User {
    id: ID!
    username: String!
    plants: [Plant!]!
    location: Location
    pins: [Pin!]
  }

  type Pin {
    id: ID!
    location: Location!
    plants: [Plant!]!
  }
`

// const resolvers = {
//   Query: {
//     user: neo4jgraphql
//   }
// }

module.exports = {typeDefs}

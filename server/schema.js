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

const typeDefs = `
  type Query {
    user(id: ID, name: String): User
    location(lat: Float!, lng: Float!): Location
    plant(id: ID, commonName: String): Plant
  }

  type Location {
    point: Point
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
    name: String!
    plants: [Plant!]! @relation(name: "FOUND", direction: "OUT")
    location: Location
    pins: [Pin!] @relation(name: "CREATED", direction: "OUT")
  }

  type Pin {
    id: ID!
    location: Location!
    users: [User!]! @relation(name: "CREATED", direction: "IN")
    plants: [Plant!]! @relation(name: "HAS_PLANTS", direction: "OUT")
  }
`

const resolvers = {
  Query: {
    User(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo)
    }
  }
}

module.exports = {typeDefs}

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
    user(id: ID, name: String, email: String): User
    location(lat: Float!, lng: Float!): Location
    plant(id: ID, commonName: String): Plant
  }

  type Location {
    id: ID!
    pin: Pin
    point: Point @cypher (statement: "MATCH (p:Pin { lat: location.lat, long: location.long point: point({latitude: location.lat, longitude: location.long}) MATCH (n {name: user.name}) CREATE (n)-[r:CREATED {dateCreated: date()}]->(p)")
    lat: Float!
    long: Float!
  }

  type Mutation {
    createPin(
      username: String!
      plantCommonName: String!
      lat: Float!
      long: Float!
    ): Pin!
  }

  type Plant {
    id: ID
    commonName: String!
    scientificName: String
    imageURL: String
    description: String
    poisonous: Boolean
    user: User @relation(name: "FOUND", direction: "IN")
  }

  type User {
    id: ID
    name: String!
    email: String!
    password: String!
    plants: [Plant!]! @relation(name: "FOUND", direction: "OUT")
    location: Location
    pins: [Pin!] @relation(name: "CREATED", direction: "OUT")
    deviceIds: [String!]
    isLoggedIn: Boolean
  }

  type Pin {
    id: ID!
    user: User! @relation(name: "CREATED", direction: "IN")
    plants: [Plant!]! @relation(name: "HAS_PLANTS", direction: "OUT")
    point: Point @cypher (statement: "MATCH (p:Pin { lat: location.lat, long: location.long point: point({latitude: location.lat, longitude: location.long}) MATCH (n {name: user.name}) CREATE (n)-[r:CREATED {dateCreated: date()}]->(p)")
    lat: Float!
    lng: Float!
  }
`

const resolvers = {
  Query: {
    User(parent, args, ctx, info) {
      return neo4jgraphql(parent, args, ctx, info)
    }
  }
  // Mutation: {
  //   createPin(parent, args, ctx, info) {
  //     return neo4jgraphql(parent, args, ctx, info)
  //   }
  //   createPlant(parent, args, ctx, info) {
  //     return neo4jgraphql(parent, args, ctx, info)
  //   }
  // }
}

// const resolvers = {
//   Query: {
//     user: neo4jgraphql
//   }
// }

module.exports = {typeDefs}

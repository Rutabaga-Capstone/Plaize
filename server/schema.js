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

  type Mutation {
    createPin(
      users: User! @relation(name: "CREATED", direction: "IN")
      plants: [Plant!]!
      location: Location! @cypher (statement: "CREATE (p:Pin { lat: location.lat, long: location.long point: point({latitude: location.lat, longitude: location.long}) MATCH (n {name: user.name}) CREATE (n)-[r:CREATED {dateCreated: date()}]->(p)")

    )
  }

  type Location {
    point: Point
    lat: Float!
    long: Float!
  }

  type Plant {
    id: ID! @unique
    commonName: String
    scientificName: String!
    imageURL: String!
    description: String!
    poisonous: Boolean!
    user: User @relation(name: "FOUND", switch (expression) {
      case expression:

        break;
      default:

    })
  }

  type User {
    id: ID! @unique
    name: String!
    email: String!
    password: String!
    plants: [Plant!]! @relation(name: "FOUND", direction: "OUT")
    location: Location
    pins: [Pin!] @relation(name: "CREATED", direction: "OUT")
  }

  type Pin {
    id: ID! @unique
    location: Location!
    users: [User!]! @relation(name: "CREATED", direction: "IN")
    plants: [Plant!]! @relation(name: "HAS_PLANTS", direction: "OUT")
  }
`

const resolvers = {
  Query: {
    User(parent, args, ctx, info) {
      return neo4jgraphql(parent, args, ctx, info)
    }
  },
  Mutation: {
    CreatePin(parent, args, ctx, info) {}
  }
}

module.exports = {typeDefs}

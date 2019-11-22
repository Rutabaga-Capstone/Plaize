const {ApolloServer} = require('apollo-server')
const typeDefs = require('./schema')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log('GraphQL Apollo Server running at ' + url)
})

const path = require('path')
const {ApolloServer, makeExecutableSchema} = require('apollo-server-express')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {typeDefs, resolvers} = require('./schema')
const neo4j = require('neo4j-driver').v1
const {makeAugmentedSchema} = require('neo4j-graphql-js')
require('dotenv').config()
const EXPRESS_SERVER_PORT = process.env.PORT || process.env.EXPRESS_SERVER_PORT
const EXPRESS_SERVER_ADDRESS = process.env.EXPRESS_SERVER_ADDRESS

const app = express()

const graphqlPath = '/graphql'

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers
})

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)
const server = new ApolloServer({
  schema,
  context: {driver},
  introspection: true,
  playground: true
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // applies graphql query as middleware and defines api endpoint as /graphql
  app.use('/image', require('./image'))
  server.applyMiddleware({app, graphqlPath})

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(EXPRESS_SERVER_PORT, () =>
    console.log(
      `Express server listening for API calls at http://${EXPRESS_SERVER_ADDRESS}:${EXPRESS_SERVER_PORT}`
    )
  )
}

async function bootApp() {
  await createApp()
  await startListening()
}
bootApp()

module.exports = app

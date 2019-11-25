const path = require('path')
const {ApolloServer, makeExecutableSchema} = require('apollo-server-express')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {typeDefs} = require('./schema')
const neo4j = require('neo4j-driver').v1
const {augmentSchema} = require('neo4j-graphql-js')
const PORT = process.env.PORT || 1234
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 7687
const app = express()
module.exports = app

require('dotenv').config()

const graphqlPath = '/graphql'

const schema = makeExecutableSchema({typeDefs})

const augmentedSchema = augmentSchema(schema)

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const server = new ApolloServer({
  schema: augmentedSchema,
  context: {driver},
  introspection: true,
  playground: true
})

// const resolvers = {
//   Query,
//   User
// }

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // applies graphql query as middleware and defines api endpoint as /graphql
  server.applyMiddleware({app, graphqlPath})

  // needs to server a file from the server... but which file?
  // app.use(something, path.join(path__, something))

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
  app.use((req, res, next, err) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening
  app.listen(PORT, () =>
    console.log(`Graphql at http://localhost:${PORT}${graphqlPath}`)
  )
}

async function bootApp() {
  await createApp()
  await startListening()
}

bootApp()

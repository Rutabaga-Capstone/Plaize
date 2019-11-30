require('dotenv').config()
const path = require('path')
const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const neo4j = require('neo4j-driver').v1
const {makeAugmentedSchema, inferSchema} = require('neo4j-graphql-js')

const PORT = process.env.PORT
const app = express()
const graphqlPath = '/graphql'

const inferAugmentedSchema = driver => {
  return inferSchema(driver, {alwaysIncludeRelationships: false}).then(
    result => {
      console.log('Inferred TypeDefs are:')
      console.log(result.typeDefs)

      return makeAugmentedSchema({
        typeDefs: result.typeDefs
      })
    }
  )
}

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const createServer = augmentedSchema =>
  new ApolloServer({
    schema: augmentedSchema,
    // inject the request object into the context to support middleware
    // inject the Neo4j driver instance to handle database call
    context: ({req}) => {
      return {
        driver,
        req
      }
    }
  })

const createApp = server => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  app.use('/image', require('./image'))

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
  app.use((err, req, res, next) => {
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

async function bootApp(server) {
  await createApp(server)
  await startListening()
}

inferAugmentedSchema(driver)
  .then(createServer)
  .then(server => {
    bootApp(server)
  })
  .catch(err => console.error(err))

module.exports = app

import {ApolloServer, gql} from 'apollo-server'
import {readFileSync} from 'fs'
import faker from 'faker'
import {resolvers} from './resolvers'

initialize()

async function initialize() {
  // Seed for consistent random dummy data
  faker.seed(100)

  // Schema
  const schema = readFileSync('./schema.graphql')

  // Launch server
  const server = new ApolloServer({
    resolvers,
    typeDefs: gql`${schema}`,
  })
  const {url} = await server.listen(3000)
  console.log('Server started at', url)
}

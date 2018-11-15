import {ApolloServer, gql} from 'apollo-server'
import {readFileSync} from 'fs'
import faker from 'faker'
import {companies, employees, teams} from './data'
import {resolvers} from './resolvers'

initialize()

async function initialize() {
  // Seed for consistent random dummy data
  faker.seed(100)

  // Schemas
  const schemas = {
    query: readFileSync('./schema/query.graphql'),
    mutation: readFileSync('./schema/mutation.graphql'),
  }

  // Launch server
  const server = new ApolloServer({
    context: {
      companies,
      employees,
      teams,
    },
    resolvers,
    typeDefs: gql`${schemas.query} ${schemas.mutation}`,
  })
  const {url} = await server.listen(3000)
  console.log('Server started at', url)
}

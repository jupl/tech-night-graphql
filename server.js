import {ApolloServer, gql} from 'apollo-server'
import {readFileSync} from 'fs'
import faker from 'faker'
import * as auth from './auth'
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

  // Context factory that is generated per request
  const context = ({req, res}) => ({
    companies,
    employees,
    teams,
    auth: auth.create(req, res),
  })

  // Launch server
  const server = new ApolloServer({
    context,
    resolvers,
    typeDefs: gql`${schemas.query} ${schemas.mutation}`,
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
  })
  const {url} = await server.listen(3000)
  console.log('Server started at', url)
}

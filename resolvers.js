import {AuthenticationError, withFilter} from 'apollo-server'

/** GraphQL server schema resolvers */
export const resolvers = {
  Query: {
    version: () => '0.0.1',
    authorized: (_, __, {auth}) => auth.ok(),
    company: (_, {id}, {companies}) => companies.findFirst({id}),
    companies: (_, {country}, {companies}) => country
      ? companies.find({country})
      : companies.all(),
    employee: (_, {id}, {employees}) => employees.findFirst({id}),
    employees: (_, __, {employees}) => employees.all(),
    team: (_, {id}, {teams}) => teams.findFirst({id}),
    teams: (_, __, {teams}) => teams.all(),
  },
  Mutation: {
    addCompany: (_, {company}, {auth, companies, pubsub}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      const newCompany = companies.add(company)
      pubsub.publish('newCompany', {newCompany})
      return newCompany
    },
    addEmployee: (_, {employee}, {auth, employees, pubsub}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      const newEmployee = employees.add(employee)
      pubsub.publish('newEmployee', {newEmployee})
      return newEmployee
    },
    addTeam: (_, {team}, {auth, teams, pubsub}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      const newTeam = teams.add(team)
      pubsub.publish('newTeam', {newTeam})
      return newTeam
    },
    authorize: (_, __, {auth}) => auth.on(),
    unauthorize: (_, __, {auth}) => auth.off(),
  },
  Subscription: {
    newCompany: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(['newCompany']),
    },
    newEmployee: {
      subscribe: withFilter(
        (_, __, {pubsub}) => pubsub.asyncIterator(['newEmployee']),
        ({newEmployee}, {company}) => !company || newEmployee.companyId === company,
      ),
    },
    newTeam: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(['newTeam']),
    },
  },
  Company: {
    employees: ({id}, _, {employees}) => employees.find({companyId: id}),
  },
  Employee: {
    company: ({companyId}, _, {companies}) => companies.findFirst({id: companyId}),
    teams: ({id}, _, {teams}) => teams.find({employeeIds: [id]}),
  },
  Team: {
    employees: ({employeeIds}, _, {employees}) => employees.find({id: employeeIds}),
  },
}

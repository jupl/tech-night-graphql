import {AuthenticationError} from 'apollo-server'

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
    addCompany: (_, {company}, {auth, companies}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      return companies.add(company)
    },
    addEmployee: (_, {employee}, {auth, employees}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      return employees.add(employee)
    },
    addTeam: (_, {team}, {auth, teams}) => {
      if(!auth.ok()) {
        throw new AuthenticationError('You are not authorized')
      }
      return teams.add(team)
    },
    authorize: (_, __, {auth}) => auth.on(),
    unauthorize: (_, __, {auth}) => auth.off(),
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

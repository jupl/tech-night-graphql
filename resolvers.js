import {companies, employees, teams} from './data'

export const resolvers = {
  Query: {
    version: () => '0.0.1',
    companies: () => companies.all(),
    employees: () => employees.all(),
    teams: () => teams.all(),
  },
}

import {companies, employees, teams} from './data'

export const resolvers = {
  Query: {
    version: () => '0.0.1',
    company: (_, {id}) => companies.findFirst({id}),
    companies: (_, {country}) => country
      ? companies.find({country})
      : companies.all(),
    employee: (_, {id}) => employees.findFirst({id}),
    employees: () => employees.all(),
    team: (_, {id}) => teams.findFirst({id}),
    teams: () => teams.all(),
  },
  Mutation: {
    addCompany: (_, {company}) => companies.add(company),
    addEmployee: (_, {employee}) => employees.add(employee),
    addTeam: (_, {team}) => teams.add(team),
  },
  Company: {
    employees: ({id}) => employees.find({companyId: id}),
  },
  Employee: {
    company: ({companyId}) => companies.findFirst({id: companyId}),
    teams: ({id}) => teams.find({employeeIds: [id]}),
  },
  Team: {
    employees: ({employeeIds}) => employees.find({id: employeeIds}),
  },
}

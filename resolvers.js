import {companies, employees, teams} from './data'

export const resolvers = {
  Query: {
    version: () => '0.0.1',
    company: (_, args) => companies.findFirst({id: args.id}),
    companies: (_, args) => args.country
      ? companies.find({country: args.country})
      : companies.all(),
    employee: (_, args) => employees.findFirst({id: args.id}),
    employees: () => employees.all(),
    team: (_, args) => teams.findFirst({id: args.id}),
    teams: () => teams.all(),
  },
  Company: {
    employees: company => employees.find({companyId: company.id}),
  },
  Employee: {
    company: employee => companies.findFirst({id: employee.companyId}),
    teams: employee => teams.find({employeeIds: [employee.id]}),
  },
  Team: {
    employees: team => employees.find({id: team.employeeIds}),
  },
}

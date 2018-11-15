export const resolvers = {
  Query: {
    version: () => '0.0.1',
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
    addCompany: (_, {company}, {companies}) => companies.add(company),
    addEmployee: (_, {employee}, {employees}) => employees.add(employee),
    addTeam: (_, {team}, {teams}) => teams.add(team),
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

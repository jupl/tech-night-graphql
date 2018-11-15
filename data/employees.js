import faker from 'faker'
import * as companies from './companies'
import {finder} from './util'

/** @typedef {Object} Employee */

// Dummy data cache
let employees = Array
  .from({length: 500})
  .map(() => ({
    id: faker.random.uuid(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    title: faker.name.jobTitle(),
    phone: faker.phone.phoneNumber(),
    profile: faker.lorem.words(2),
    avatar: faker.image.avatar(),
    salary: faker.finance.amount(),
    companyId: companies.at(faker.random.number(companies.count() - 1)).id,
  }))

/**
 * Fetch all employees
 * @return {Array<Employee>}List of employees
 */
export const all = () => employees

/**
 * Fetch employee count
 * @return {number} Number of employees
 */
export const count = () => employees.length

/**
 * Get employee at data index if available
 * @param {number} index Index for data lookup
 * @return {Employee | undefined} Employee
 */
export const at = index => employees[index]

/**
 * Find employees matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Array<Employee>} List of employees matching criteria
 */
export const find = criteria => finder(employees, criteria)

/**
 * Find first employee matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Employee | undefined} Employees matching criteria if available
 */
export const findFirst = criteria => find(criteria)[0]

/**
 * Insert employee
 * @param {Object} data New employee data
 * @return {Employee} New employee
 */
export const add = data => {
  const employee = {
    ...data,
    id: faker.random.uuid(),
    teams: [],
  }
  employees = [...employees, employee]
  return employee
}

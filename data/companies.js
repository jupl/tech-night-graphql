import faker from 'faker'
import {finder} from './util'

/** @typedef {Object} Company */

// Dummy data cache
let companies = Array
  .from({length: 10})
  .map(() => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    slogan: faker.company.catchPhrase(),
    phone: faker.phone.phoneNumber(),
    founded: faker.date.past(),
    country: faker.address.countryCode(),
    email: faker.internet.email(),
    website: faker.internet.url(),
  }))

/**
 * Fetch all companies
 * @return {Array<Company>} List of companies
 */
export const all = () => companies

/**
 * Fetch company count
 * @return {number} Number of companies
 */
export const count = () => companies.length

/**
 * Get company at data index if available
 * @param {number} index Index for data lookup
 * @return {Company | undefined} Company
 */
export const at = index => companies[index]

/**
 * Find companies matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Array<Company>} List of companies matching criteria
 */
export const find = criteria => finder(companies, criteria)

/**
 * Find first company matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Company | undefined} Company matching criteria if available
 */
export const findFirst = criteria => find(criteria)[0]

/**
 * Insert company
 * @param {Object} data New company data
 * @return {Company} New company
 */
export const add = data => {
  const company = {
    ...data,
    id: faker.random.uuid(),
  }
  companies = [...companies, company]
  return company
}

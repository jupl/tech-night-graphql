import faker from 'faker'
import * as employees from './employees'
import {finder} from './util'

/** @typedef {Object} Team */

// Dummy data cache
let teams = Array
  .from({length: 50})
  .map(() => ({
    id: faker.random.uuid(),
    name: faker.hacker.abbreviation(),
    employeeIds: [...new Set(
      Array
        .from({length: 8})
        .map(() => employees.at(faker.random.number(employees.count() - 1)).id)
    )],
  }))

/**
 * Fetch all teams
 * @return {Array<Team>} List of teams
 */
export const all = () => teams

/**
 * Fetch team count
 * @return {number} Number of teams
 */
export const count = () => teams.length

/**
 * Get team at data index if available
 * @param {number} index Index for data lookup
 * @return {Team | undefined} Team
 */
export const at = index => teams[index]

/**
 * Find teams matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Array<Team>} List of teams matching criteria
 */
export const find = criteria => finder(teams, criteria)

/**
 * Find first team matching search criteria
 * @param {Object} criteria Search criteria as defined in finder
 * @return {Team | undefined} Teams matching criteria if available
 */
export const findFirst = criteria => find(criteria)[0]

/**
 * Insert team
 * @param {Object} data New team data
 * @return {Team} New team
 */
export const add = data => {
  const team = {
    ...data,
    id: faker.random.uuid(),
    employeeIds: data.employeeIds ? data.employeeIds : [],
  }
  teams = [...teams, team]
  return team
}

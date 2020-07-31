'use strict'

/*
|--------------------------------------------------------------------------
| TeamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Team')} */
const Team = use("App/Models/Team")

/** @type {import('../../app/Models/Group')} */
const Group = use("App/Models/Group")

/** @type {import('../../app/Models/Match')} */
const Match = use("App/Models/Match")

class TeamSeeder {
  async run() {
    const teams = require("../teams")

    /**
     * sort teams bases on their strength
     */
    teams.sort((a, b) => (a.strength > b.strength) ? 1 : -1)

    let groups = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
    }
    let teamIndex = 0
    for (const key of Object.keys(groups)) {
      if (groups[key].length < 4) {
        groups[key].push(teams[teamIndex])
        groups[key].push(teams[teamIndex + 4])
        groups[key].push(teams[teamIndex + 8])
        groups[key].push(teams[teamIndex + 12])
      }
      teamIndex++
    }

    await Team.query().where({}).delete() // delete teams if exists any
    await Match.query().where({}).delete() // delete matches if exists any

    for (const groupName of Object.keys(groups)) {
      const group = await Group.findOrCreate({
        name: groupName
      })

      await group.teams().createMany(groups[groupName])
    }
  }
}

module.exports = TeamSeeder

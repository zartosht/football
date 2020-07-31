'use strict'

const Team = use("App/Models/Team")
const { trait, test } = use('Test/Suite')('Get Team Matches')

trait('Test/ApiClient')
trait('Auth/Client')

test('Make sure team matches matches the data stored on it', async ({ client }) => {
  for (let team_id = 1; team_id < 33; team_id++) {
    const response = await client.get(`matches/${team_id}`).end()

    console.log(`Team: ${team_id}`)

    const team = await Team.find(team_id),
      matches = await team.matches()

    response.assertJSONSubset({
      team: team.toJSON(),
      matches: matches.matches
    })
  }
})

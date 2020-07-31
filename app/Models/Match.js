'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('../../app/Models/Team')} */
const Team = use("App/Models/Team")

class Match extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to guess goals in a match.
         */
        this.addHook('beforeSave', async (matchInstance) => {
            const firstTeam = await Team.find(matchInstance.first_team_id)
            const secondTeam = await Team.find(matchInstance.second_team_id)

            // Check if at param is one of players, if so prevent calling database again
            const at = matchInstance.first_team_id === matchInstance.at ? firstTeam : matchInstance.second_team_id === matchInstance.at ? secondTeam : await Team.find(matchInstance.at)

            const { firstGoals, secondGoals } = await firstTeam.matchResult(secondTeam, at) // Get match results

            // Store match results in match model
            matchInstance.first_team_goals = firstGoals
            matchInstance.second_team_goals = secondGoals
        })
    }
}

module.exports = Match

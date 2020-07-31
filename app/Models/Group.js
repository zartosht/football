'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('../../app/Models/Match')} */
const Match = use("App/Models/Match")

class Group extends Model {

    /**
     * Play matches within the group
     * 
     * @param {integer} week 
     */
    async play(week = 1) {
        week = parseInt(week - 1)
        const teams = await this.teams().fetch()
        let matches = []
        const fixture = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2], [3, 0, 2, 1], [2, 0, 3, 1], [1, 0, 3, 2]],
            teamIndexes = fixture[week]

        for (var i = 0; i < teamIndexes.length; i += 2) {
            const indexHomeTeam = teamIndexes[i]
            const indexAwayTeam = teamIndexes[i + 1]

            matches.push(await Match.findOrCreate({
                first_team_id: teams.toJSON()[indexHomeTeam].id,
                second_team_id: teams.toJSON()[indexAwayTeam].id,
                at: teams.toJSON()[indexHomeTeam].id,
                week: week + 1
            }))
        }

        return matches
    }

    async pickTwoBest() {
        const teams = await this.teams().fetch()

        for (const team of teams.rows) {

        }
    }

    /**
     * List of teams inside this group
     *
     * @method teams
     *
     * @return {Object}
     */
    teams() {
        return this.hasMany('App/Models/Team')
    }
}

module.exports = Group

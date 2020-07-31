'use strict'

/** @type {import('../../app/Models/Match')} */
const Match = use("App/Models/Match")

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KnockoutCup extends Model {
    /**
     * Play matches on knockuot cup team group
     * 
     * @param {Intger} week 
     */
    static async play(week = 7) {
        if (week > 6 && week < 9) {
            let oneEighthFirsthKnouckoutCupGroup = await KnockoutCup.query().where("name", "1_16_1").with("teams").first(),
                oneEighthSecondKnouckoutCupGroup = await KnockoutCup.query().where("name", "1_16_2").with("teams").first()

            if (!oneEighthFirsthKnouckoutCupGroup || !oneEighthSecondKnouckoutCupGroup) return []
            
            oneEighthFirsthKnouckoutCupGroup = oneEighthFirsthKnouckoutCupGroup.toJSON()
            oneEighthSecondKnouckoutCupGroup = oneEighthSecondKnouckoutCupGroup.toJSON()
            for (let teamIndex = 0; teamIndex < oneEighthFirsthKnouckoutCupGroup.teams.length; teamIndex++) {
                await Match.findOrCreate({
                    first_team_id: oneEighthFirsthKnouckoutCupGroup.teams[teamIndex].id,
                    second_team_id: oneEighthSecondKnouckoutCupGroup.teams[teamIndex].id,
                    at: week === 7 ? oneEighthFirsthKnouckoutCupGroup.teams[teamIndex].id : oneEighthSecondKnouckoutCupGroup.teams[teamIndex].id,
                    week: week
                })
            }
        } else {

        }
    }


    teams() {
        return this.belongsToMany('App/Models/Team')
    }
}

module.exports = KnockoutCup

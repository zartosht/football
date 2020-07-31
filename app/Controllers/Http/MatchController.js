'use strict'

/** @type {import('../../app/Models/KnockoutCup')} */
const KnockoutCup = use("App/Models/KnockoutCup")

/** @type {import('../../app/Models/Team')} */
const Team = use("App/Models/Team")

/** @type {import('../../app/Models/Group')} */
const Group = use("App/Models/Group")

class MatchController {

    /**
     * Show match results based on the week number
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async showResults({ request, response, params }) {
        const groups = await Group.all()
        let result = []

        for (const group of groups.rows) {
            if (params.WEEK < 7) {
                await group.play(params.WEEK)
                const teams = await group.teams().fetch()
                result.push({
                    group: group.name,
                    teams
                })

                if (result.length === 8) return result // Return result when all groups are filed
            } else if (params.WEEK < 9) {
                const teams = await group.teams().orderBy("score", "desc").pick(2)

                /**
                 * Make two group consisting of 8 teams each, to make sure no two teams
                 * end up matching from same group
                 */
                const firstKnockoutCupGroup = await KnockoutCup.findOrCreate({
                    name: "1_16_1"
                }),
                    secondKnockoutCupGroup = await KnockoutCup.findOrCreate({
                        name: "1_16_2"
                    })


                const showResults = async (week) => {
                    await KnockoutCup.play(week)

                    let firstKnockoutCupGroupTeams = await firstKnockoutCupGroup.teams().fetch()
                    let secondKnockoutCupGroupTeams = await secondKnockoutCupGroup.teams().fetch()

                    return [
                        {
                            group: "1-16",
                            teams: [
                                ...firstKnockoutCupGroupTeams.rows,
                                ...secondKnockoutCupGroupTeams.rows
                            ]
                        }
                    ]
                }

                let firstKnockoutCupGroupTeams = await firstKnockoutCupGroup.teams().fetch()
                if (firstKnockoutCupGroupTeams.rows.length === 8) {
                    return await showResults(params.WEEK, firstKnockoutCupGroupTeams)
                }

                await firstKnockoutCupGroup.teams().save(teams.rows[0])
                await secondKnockoutCupGroup.teams().save(teams.rows[1])

                firstKnockoutCupGroupTeams = await firstKnockoutCupGroup.teams().fetch()
                if (firstKnockoutCupGroupTeams.rows.length === 8) {
                    return await showResults(params.WEEK, firstKnockoutCupGroupTeams)
                }
            }
        }
    }
}

module.exports = MatchController

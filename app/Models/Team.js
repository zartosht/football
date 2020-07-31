'use strict'

const { randomBetween } = require('../Helpers')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  /**
   * Guess match result agains a given team
   * multiply team strength with 1.2 factor when it is playing at their home
   * 
   * @param {Team} against 
   * @param {Team} at 
   */
  async matchResult(against, at) {
    // Make player that are playing in his home 20% more chance
    const firstGoals = Math.round((randomBetween() * (this.id == at.id ? 1.2 : 1) * this.strength) / 4),
      secondGoals = Math.round((randomBetween() * (against.id == at.id ? 1.2 : 1) * against.strength) / 4)

    /**
     * Calculate score based on the match result
     */
    if (firstGoals === secondGoals) {
      this.draw = this.draw + 1
      this.score = this.score + 1
      this.strength = this.strength + 1

      against.draw = against.draw + 1
      against.score = against.score + 1
      against.strength = against.strength + 1
    }

    if (firstGoals > secondGoals) {
      this.win = this.win + 1
      this.score = this.score + 3
      this.strength = this.strength + 3

      against.lose = against.lose + 1
    }

    if (firstGoals < secondGoals) {
      this.lose = this.lose + 1

      against.win = against.win + 1
      against.score = against.score + 3
      against.strength = against.strength + 3
    }

    /**
     * Update home and away team stats
     */
    this.plays = this.plays + 1
    this.goals_for = this.goals_for + firstGoals
    this.goals_against = this.goals_against + secondGoals
    this.goals_average = this.goals_for - this.goals_against

    against.plays = against.plays + 1
    against.goals_for = against.goals_for + secondGoals
    against.goals_against = against.goals_against + firstGoals
    against.goals_average = against.goals_for - against.goals_against

    await against.save()
    await this.save()

    return {
      firstGoals,
      secondGoals
    }
  }

  /**
   * Get current team's group
   *
   * @method group
   *
   * @return {Object}
   */
  group() {
    return this.belongsTo('App/Models/Group')
  }

  knockoutCup() {
    return this.belongsToMany('App/Models/KnockoutCup')
  }

  async matches() {
    const Database = use("Database"),
      id = this.id
    return await Database.table("matches").where(function () {
      this.where('first_team_id', id)
        .orWhere('second_team_id', id)
    })
  }
}

module.exports = Team

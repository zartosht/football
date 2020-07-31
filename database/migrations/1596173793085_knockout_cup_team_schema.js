'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KnockoutCupTeamSchema extends Schema {
  up () {
    this.create('knockout_cup_team', (table) => {
      table.increments()
      table.integer('knockout_cup_id').unsigned().references('id').on('knockout_cups').onDelete('cascade').onUpdate('cascade')
      table.integer('team_id').unsigned().references('id').on('teams').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('knockout_cup_team')
  }
}

module.exports = KnockoutCupTeamSchema

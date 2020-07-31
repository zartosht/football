'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.create('matches', (table) => {
      table.increments()
      table.integer('first_team_id').unsigned().references('id').on('teams').onDelete('cascade').onUpdate('cascade')
      table.integer('second_team_id').unsigned().references('id').on('teams').onDelete('cascade').onUpdate('cascade')
      table.integer('at').unsigned().references('id').on('teams').onDelete('cascade').onUpdate('cascade')
      table.integer('first_team_goals')
      table.integer('second_team_goals')
      table.integer('week').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('matches')
  }
}

module.exports = MatchSchema

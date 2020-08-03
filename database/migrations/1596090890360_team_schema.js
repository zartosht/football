'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.string('name')
      table.string('strength').defaultTo('0')
      table.integer('group_id').unsigned().references('id').on('groups').onDelete('cascade').onUpdate('cascade')
      table.integer('plays').defaultTo(0)
      table.integer('win').defaultTo(0)
      table.integer('draw').defaultTo(0)
      table.integer('lose').defaultTo(0)
      table.integer('goals_for').defaultTo(0)
      table.integer('goals_against').defaultTo(0)
      table.integer('goals_average').defaultTo(0)
      table.integer('score').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema

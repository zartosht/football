'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KnockoutCupSchema extends Schema {
  up () {
    this.create('knockout_cups', (table) => {
      table.increments()
      table.string("name")
      table.timestamps()
    })
  }

  down () {
    this.drop('knockout_cups')
  }
}

module.exports = KnockoutCupSchema

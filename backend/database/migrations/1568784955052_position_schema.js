'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionSchema extends Schema {
  up () {
    this.create('positions', (table) => {
      table.increments()
      // table.string('position_code', 5).notNullable().unique()
      table.string('name', 20).notNullable().unique().collate('utf8_unicode_ci')
      table.integer("basic_salary").unsigned().defaultsTo(0)
      table.integer("position_coefficient").notNullable().unsigned().unique()
      table.integer("responsibility_coefficient").notNullable().unsigned().unique()
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('positions')
  }
}

module.exports = PositionSchema

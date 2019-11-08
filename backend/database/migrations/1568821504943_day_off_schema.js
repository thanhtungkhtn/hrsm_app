'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DayOffSchema extends Schema {
  up () {
    this.create('day_offs', (table) => {
      table.increments()
      // table.integer('employee_id', 5).references('id').inTable('employees')
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      table.integer('office_id')
        .unsigned()
        .references("id")
        .inTable("offices")
      table.integer('number_of_holidays').notNullable()

      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('day_offs')
  }
}

module.exports = DayOffSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionAllowanceSchema extends Schema {
  up () {
    this.create('position_allowances', (table) => {
      table.increments()
      // table.string('MaPhuCap', 5).notNullable().unique()
      // table.integer('employee_id', 5).notNullable().references('id').inTable('employees')
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      // table.integer('office_id')
      //   .unsigned()
      //   .references("id")
      //   .inTable("offices")
      table.integer('money').notNullable()
      // table.datetime('start_date').notNullable()
      // table.datetime('end_date').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('position_allowances')
  }
}

module.exports = PositionAllowanceSchema

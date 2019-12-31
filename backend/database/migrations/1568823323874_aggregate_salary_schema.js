'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AggregateSalarySchema extends Schema {
  up () {
    this.create('aggregate_salaries', (table) => {
      table.increments()
      // table.string('MaBangCong', 5).unique()
      // table.integer('employee_id', 5).references('id').inTable('employees')
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      // table.integer('office_id', 5).unsigned().references('id').inTable('offices')
      // table.integer('hours')
      table.integer('date_work')
      table.integer('months_work')


      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('aggregate_salaries')
  }
}

module.exports = AggregateSalarySchema

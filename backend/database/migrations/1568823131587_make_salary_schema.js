'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MakeSalarySchema extends Schema {
  up () {
    this.create('make_salaries', (table) => {
      table.increments()
      // table.integer('employee_id', 5).references('id').inTable('employees')
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      table.datetime('date').notNullable()
      table.datetime('check_in').notNullable()
      table.datetime('check_out').notNullable()
      table
        .enum("status", ["CHECKIN", "CHECKOUT", "UNKWON"])
        .defaultsTo("UNKWON");
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('make_salaries')
  }
}

module.exports = MakeSalarySchema

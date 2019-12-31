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
      table.date('date').notNullable()
      table.time('check_in')
      table.time('check_out')
      table.float('date_work')
      // table
      //   .enum("status", ["CHECKIN", "CHECKOUT", "UNKWON"])
      //   .defaultsTo("UNKWON");
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('make_salaries')
  }
}

module.exports = MakeSalarySchema

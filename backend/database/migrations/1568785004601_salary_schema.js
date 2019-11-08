'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalarySchema extends Schema {
  up () {
    this.create('salaries', (table) => {
      table.increments()
      // table.string('MaHeSoLuong', 5).notNullable().unique()
      table.integer('min_experience').notNullable()
      table.integer('max_experience').notNullable()
      table.integer("salary_coefficient").notNullable().unsigned().unique()
      // table.integer("basic_salary").unsigned().defaultsTo(0)
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('salaries')
  }
}

module.exports = SalarySchema

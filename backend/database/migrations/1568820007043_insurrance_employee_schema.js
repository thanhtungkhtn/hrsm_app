'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsurranceEmployeeSchema extends Schema {
  up () {
    this.create('insurrance_employees', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .defaultsTo(3);
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      table.integer('insurrance_id')
        .unsigned()
        .references("id")
        .inTable("insurrances")

      // table.string('MaNhanVien', 5).references('MaNhanVien').inTable('employees')
      // table.string('MaBaoHiem', 5).references('MaBaoHiem').inTable('insurrances')
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('insurrance_employees')
  }
}

module.exports = InsurranceEmployeeSchema

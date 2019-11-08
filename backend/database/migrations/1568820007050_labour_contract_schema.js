'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LabourContractSchema extends Schema {
  up () {
    this.create('labour_contracts', (table) => {
      table.increments()
      // table.string('MaHD', 5).notNullable().unique()

      table.integer('user_id')
        .unsigned()
        .references("id")
        .inTable("users")

      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")

      table.integer('position_id')
        .unsigned()
        .references("id")
        .inTable("positions")

      table.integer('office_id')
        .unsigned()
        .references("id")
        .inTable("offices")

      table.integer('salary_id')
        .unsigned()
        .references("id")
        .inTable("salaries")
      table.integer('literacy_id')
        .unsigned()
        .references("id")
        .inTable("literacies")

      table.integer('insurrance_employee_id')
        .unsigned()
        .references("id")
        .inTable("insurrance_employees")





      // table.string('MaNhanVien', 5).references('MaNhanVien').inTable('employees')
      // table.string('MaHeSoLuong').references('MaHeSoLuong').inTable('salaries')
      // table.string('MaCV').references('MaCV').inTable('positions')
      // table.string('MaPB').references('MaPB').inTable('offices')
      table.datetime('NgayVaoLam').notNullable()

      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('labour_contracts')
  }
}

module.exports = LabourContractSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExportSalarySchema extends Schema {
  up () {
    this.create('export_salaries', (table) => {
      table.increments()
      // table.string('MaBangLuong', 5).unique()
      // table.integer('employee_id').unsigned().references('employee_id').inTable('labour_contracts')

      table.integer('employee_id', 5).unsigned().references('id').inTable('employees')
      // table.integer('labour_contract_id').unsigned().references('id').inTable('labour_contracts')


      table.integer('aggregate_salary_id', 5).unsigned().references('id').inTable('aggregate_salaries')
      // table.integer('office_id').unsigned().references('id').inTable('offices')

      // table.integer('salary_id').unsigned().references('salary_id').inTable('labour_contracts')
      table.float('position_allowance').defaultsTo(0);
      table.integer('insurrance_employee').defaultsTo(0);

      table.float('TienThuongPhat').defaultsTo(0);
      // table.integer('ThangLuong').notNullable().references('SoThangCong').inTable('timesheets')
      table.integer('months_salary').defaultsTo(0);
      table.float('TongLuong', 20).defaultsTo(0);

      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('export_salaries')
  }
}

module.exports = ExportSalarySchema

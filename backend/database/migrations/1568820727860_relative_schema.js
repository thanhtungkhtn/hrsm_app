'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelativeSchema extends Schema {
  up () {
    this.create('relatives', (table) => {
      table.increments()
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")


      // table.string('MaNhanVien', 5).references('MaNhanVien').inTable('employees')
      table.string('name', 255).notNullable().collate('utf8_unicode_ci')
      table.string('relationship', 30).notNullable().collate('utf8_unicode_ci')
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('relatives')
  }
}

module.exports = RelativeSchema

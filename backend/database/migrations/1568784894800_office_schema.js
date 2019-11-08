'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfficeSchema extends Schema {
  up () {
    this.create('offices', (table) => {
      table.increments()
      // table.string('office_code', 5).notNullable().unique()
      table.string('name', 20).notNullable().unique().collate('utf8_unicode_ci')
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('offices')
  }
}

module.exports = OfficeSchema

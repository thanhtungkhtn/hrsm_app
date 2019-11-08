'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsurranceSchema extends Schema {
  up () {
    this.create('insurrances', (table) => {
      table.increments()
      // table.string('MaBaoHiem', 5).notNullable().unique()
      table.string('type', 50).notNullable().unique().collate('utf8_unicode_ci')
      table.string('card_number', 20).notNullable().unique()
      table.integer('insurance_money').notNullable()
      table.datetime('day_of_issue').notNullable()
      table.datetime('expiration_date').notNullable()
      table.string('place_of_issue', 100).notNullable()


      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('insurrances')
  }
}

module.exports = InsurranceSchema

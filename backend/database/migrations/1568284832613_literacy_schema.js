'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiteracySchema extends Schema {
  up () {
    this.create('literacies', (table) => {
      table.increments()
    //   table.integer('user_id')
    //   .unsigned()
    //   .references("id")
    //   .inTable("users")

    // table.integer('employee_id')
    //   .unsigned()
    //   .references("id")
    //   .inTable("employees")

      // table.string('MaTDHV', 5).notNullable().unique()
      table.string("name").notNullable().collate('utf8_unicode_ci')
      // table.string("major").notNullable().collate('utf8_unicode_ci')
      table.integer("professional_coefficient").notNullable().unsigned().unique()
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('literacies')
  }
}

module.exports = LiteracySchema

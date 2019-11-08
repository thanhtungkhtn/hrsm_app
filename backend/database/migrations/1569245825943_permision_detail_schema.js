'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermisionDetailSchema extends Schema {
  up () {
    this.create('permision_details', (table) => {
      table.increments()
      table.integer('permision_id')
            .unsigned()
            .references("id")
            .inTable("permisions")
      table.string('action_name')
      table.string('action_code')

      table.integer('check_action')
      table.timestamps()
    })
  }

  down () {
    this.drop('permision_details')
  }
}

module.exports = PermisionDetailSchema

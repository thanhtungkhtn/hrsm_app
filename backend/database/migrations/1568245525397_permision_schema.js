'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermisionSchema extends Schema {
  up () {
    this.create('permisions', (table) => {
      table.increments()
      table.string('name_per')
      table.timestamps()
    })
  }

  down () {
    this.drop('permisions')
  }
}

module.exports = PermisionSchema

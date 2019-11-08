'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments();
      table.string("title").notNullable();
      table.integer("priority").defaultsTo(0);
      table.boolean("is_active").defaultsTo(false);
      table.timestamps(true, true);
    })
  }

  down () {
    this.dropIfExists('addresses')
  }
}

module.exports = AddressSchema

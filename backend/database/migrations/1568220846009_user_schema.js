'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      // table.string('MaNhanVien').references('MaNhanVien').inTable('employees')
      table.string('email', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema

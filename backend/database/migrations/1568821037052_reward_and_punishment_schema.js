'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RewardAndPunishmentSchema extends Schema {
  up () {
    this.create('reward_and_punishments', (table) => {
      table.increments()
      // table.string('MaTP', 5).notNullable().unique()
      // table.integer('employee_id', 5).references('id').inTable('employees')
      table.integer('employee_id')
        .unsigned()
        .references("id")
        .inTable("employees")
      table
        .enum("type", ["REWARD", "PUNISHMENT", "UNKWON"])
        .defaultsTo("UNKWON");
      table.integer("money").unsigned()
      table.string("reason", 255)

      table.timestamps(true, true)
    })
  }

  down () {
    this.dropIfExists('reward_and_punishments')
  }
}

module.exports = RewardAndPunishmentSchema

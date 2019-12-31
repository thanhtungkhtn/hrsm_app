'use strict'

/*
|--------------------------------------------------------------------------
| RewardAndPunishmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const RewardAndPunishment = use('App/Models/RewardAndPunishment')

class RewardAndPunishmentSeeder {
  async run () {
    await RewardAndPunishment.createMany([
      {
        employee_id: 1,
        type: "REWARD",
        money: "2000",
        reason: "abc",
      },
      {
        employee_id: 1,
        type: "PUNISHMENT",
        money: "1000",
        reason: "abc",
      }
    ])
  }
}

module.exports = RewardAndPunishmentSeeder

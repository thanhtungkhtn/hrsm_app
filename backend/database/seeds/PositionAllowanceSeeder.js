'use strict'

/*
|--------------------------------------------------------------------------
| PositionAllowanceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const PositionAllowance = use('App/Models/PositionAllowance')

class PositionAllowanceSeeder {
  async run() {
    await PositionAllowance.createMany([
      {
        employee_id: 1,
        money: "2000",
      },
    ])
  }
}

module.exports = PositionAllowanceSeeder

'use strict'

/*
|--------------------------------------------------------------------------
| InsurranceEmployeeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const InsurranceEmployee = use('App/Models/InsurranceEmployee')

class InsurranceEmployeeSeeder {
  async run () {
    await InsurranceEmployee.createMany([
      {
        user_id: 1,
        employee_id: 1,
        insurrance_id: 1
      }
    ])
  }
}

module.exports = InsurranceEmployeeSeeder

'use strict'

/*
|--------------------------------------------------------------------------
| LiteracySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Literacy = use('App/Models/Literacy')

class LiteracySeeder {
  async run () {
    await Literacy.createMany([
      {
        // user_id: 1,
        // employee_id: 1,
        // MaTDHV: "HV1",
        name: "Trung Cấp",
        professional_coefficient: 3
      },
      {
        name: "Cao Đẳng",
        professional_coefficient: 4
      },
      {
        name: "Đại Học",
        professional_coefficient: 6
      },
      {
        name: "Thạc Sĩ",
        professional_coefficient: 7
      },
      {
        name: "Tiến Sĩ",
        professional_coefficient: 10
      }
    ])
  }
}

module.exports = LiteracySeeder

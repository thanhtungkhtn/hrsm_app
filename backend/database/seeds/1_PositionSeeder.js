'use strict'

/*
|--------------------------------------------------------------------------
| PositionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Position = use("App/Models/Position")

class PositionSeeder {
  async run () {
    await Position.createMany([
      {
        // position_code: "CV01",
        name: "Giám Đốc",
        basic_salary: 5000000,
        position_coefficient: 10,
        responsibility_coefficient: 10,
      },
      {
        // position_code: "CV02",
        name: "Phó Giám Đốc",
        basic_salary: 4000000,
        position_coefficient: 8,
        responsibility_coefficient: 7,
      },
      {
        // position_code: "CV03",
        name: "Trưởng Phòng",
        basic_salary: 3000000,
        position_coefficient: 6,
        responsibility_coefficient: 5,
      },
      {
        // position_code: "CV04",
        name: "Phó Phòng",
        basic_salary: 2500000,
        position_coefficient: 5,
        responsibility_coefficient: 3,
      },
      {
        // position_code: "CV05",
        name: "Tổ Trưởng",
        basic_salary: 2000000,
        position_coefficient: 4,
        responsibility_coefficient: 2,
      },
      {
        // position_code: "CV06",
        name: "Nhân Viên",
        basic_salary: 1700000,
        position_coefficient: 3,
        responsibility_coefficient: 0,
      }
    ])
  }
}

module.exports = PositionSeeder

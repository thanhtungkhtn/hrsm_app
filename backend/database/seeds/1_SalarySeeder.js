'use strict'

/*
|--------------------------------------------------------------------------
| SalarySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Salary = use("App/Models/Salary")

class SalarySeeder {
  async run () {
    await Salary.createMany([
      {
        // MaHeSoLuong: "L10",
        min_experience: 10,
        max_experience: 10,
        salary_coefficient: 10,
      },
      {
        min_experience: 7,
        max_experience: 10,
        salary_coefficient: 8,
      },
      {
        min_experience: 5,
        max_experience: 7,
        salary_coefficient: 7,
      },
      {
        min_experience: 4,
        max_experience: 5,
        salary_coefficient: 6,
      },
      {
        min_experience: 3,
        max_experience: 4,
        salary_coefficient: 5,
      },
      {
        min_experience: 2,
        max_experience: 3,
        salary_coefficient: 4,
      },
      {
        min_experience: 1,
        max_experience: 2,
        salary_coefficient: 3,
      },
      {
        min_experience: 0,
        max_experience: 1,
        salary_coefficient: 2,
      },
      // {
      //   // MaHeSoLuong: "L01",
      //   salary_coefficient: 1,
      //   coefficient_responsibility: 1,
      //   basic_salary: 3500000
      // },
    ])
  }
}

module.exports = SalarySeeder

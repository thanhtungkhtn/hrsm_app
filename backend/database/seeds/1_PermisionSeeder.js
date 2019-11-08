'use strict'

/*
|--------------------------------------------------------------------------
| PermisionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Permision = use("App/Models/Permision")

class PermisionSeeder {
  async run () {
    await Permision.createMany([
      {
        name_per: "Full" // Giám đốc/ P.Giám Đốc
      },
      {
        name_per: "Admin" // Trưởng phòng
      },
      {
        name_per: "Edit" // P.Phó phòng
      },
      {
        name_per: "Create" //
      },
      {
        name_per: "Only View" // Tổ Trưởng
      },
      {
        name_per: "NoF" // Nhân Viên
      }
    ])
  }
}

module.exports = PermisionSeeder

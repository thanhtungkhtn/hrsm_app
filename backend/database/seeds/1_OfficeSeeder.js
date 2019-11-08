'use strict'

/*
|--------------------------------------------------------------------------
| OfficeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Office = use("App/Models/Office")

class OfficeSeeder {
  async run () {
    await Office.createMany([
      {
        // office_code: "PB01",
        name: "Phòng Giám Đốc"
      },
      {
        // office_code: "PB02",
        name: "Phòng Phó Giám Đốc"
      },
      {
        // office_code: "PB03",
        name: "Phòng Kinh Doanh"
      },
      {
        // office_code: "PB04",
        name: "Phòng Kế Toán"
      },
      {
        // office_code: "PB05",
        name: "Phòng Kỹ Thuật"
      },
      {
        // office_code: "PB06",
        name: "Phòng Nhân Sự"
      }
    ])
  }
}

module.exports = OfficeSeeder

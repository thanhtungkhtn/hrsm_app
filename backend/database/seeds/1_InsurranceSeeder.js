'use strict'

/*
|--------------------------------------------------------------------------
| InsurranceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Insurrance = use('App/Models/Insurrance')

class InsurranceSeeder {
  async run () {
    await Insurrance.createMany([
      {
        // MaBaoHiem: "BH01",
        type: "Bảo Hiểm Y Tế",
        card_number:"000111222",
        insurance_money: "500000",
        day_of_issue: "2018-01-01",
        expiration_date: "2019-01-01",
        place_of_issue: "Hà Nội"
      }
    ])
  }
}

module.exports = InsurranceSeeder

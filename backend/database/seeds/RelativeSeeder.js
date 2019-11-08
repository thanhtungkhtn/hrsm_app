'use strict'

/*
|--------------------------------------------------------------------------
| RelativeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Relative = use('App/Models/Relative')

class RelativeSeeder {
  async run () {
    await Relative.createMany([
      {
        employee_id: 1,
        // MaNhanVien: "NV001",
        name: "Phạm Đức Toản",
        relationship: "Em Ruột"
      },
      {
        employee_id: 1,
        name: "Nguyễn Thị Gia Như",
        relationship: "Em Ruột"
      },
      {
        employee_id: 2,
        name: "Nguyẽn Thị Quyên",
        relationship: "Mẹ Ruột"
      },
      {
        employee_id: 2,
        name: "Hò Thị Thanh Thúy",
        relationship: "Người Yêu"
      },
      {
        employee_id: 3,
        name: "Phạm Văn Công",
        relationship: "Bó"
      },
      {
        employee_id: 4,
        name: "Phạm Thanh Tuan",
        relationship: "Em Ruột"
      },
      {
        employee_id: 5,
        name: "Mã Truong Vinh",
        relationship: "Em Ruột"
      },
      {
        employee_id: 6,
        name: "Phạm Đức Toản",
        relationship: "Em Ruột"
      },
      {
        employee_id: 7,
        name: "Phạm Đức Toản",
        relationship: "Em Ruột"
      },
      {
        employee_id: 7,
        name: "Phạm Đức Toản",
        relationship: "Em Ruột"
      }
    ])
  }
}

module.exports = RelativeSeeder

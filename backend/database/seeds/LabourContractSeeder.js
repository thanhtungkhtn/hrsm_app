'use strict'

/*
|--------------------------------------------------------------------------
| LabourContractSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const LabourContract = use('App/Models/LabourContract')

class LabourContractSeeder {
  async run () {
    await LabourContract.createMany([
      {
        // MaHD: "HD001",
        user_id: 1,
        employee_id: 1,
        position_id: 1,
        office_id: 1,
        salary_id: 1,
        literacy_id: 1,
        insurrance_employee_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00",
        // MaHeSoLuong: "L10"
      },
      {
        // MaHD: "HD002",
        user_id: 2,
        employee_id: 2,
        position_id: 2,
        office_id: 2,
        salary_id: 2,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD003",//
        user_id: 3,
        employee_id: 3,
        position_id: 3,
        office_id: 3,
        salary_id: 3,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD004",
        user_id: 4,
        employee_id: 4,
        position_id: 3,
        office_id: 4,
        salary_id: 3,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD005",
        user_id: 5,
        employee_id: 5,
        position_id: 3,
        office_id: 5,
        salary_id: 3,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD006",//
        user_id: 6,
        employee_id: 6,
        position_id: 3,
        office_id: 6,
        salary_id: 3,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD007", //
        user_id: 7,
        employee_id: 7,
        position_id: 4,
        office_id: 3,
        salary_id: 4,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD008",
        user_id: 8,
        employee_id: 8,
        position_id: 4,
        office_id: 4,
        salary_id: 4,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD009",
        user_id: 9,
        employee_id: 9,
        position_id: 4,
        office_id: 5,
        salary_id: 4,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD010",
        user_id: 10,
        employee_id: 10,
        position_id: 4,
        office_id: 6,
        salary_id: 4,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD011", // tô trưởng
        user_id: 11,
        employee_id: 11,
        position_id: 5,
        office_id: 3,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD012",
        user_id: 12,
        employee_id: 12,
        position_id: 5,
        office_id: 3,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD013",
        user_id: 13,
        employee_id: 13,
        position_id: 5,
        office_id: 4,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD014",
        user_id: 14,
        employee_id: 14,
        position_id: 5,
        office_id: 4,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD015", //
        user_id: 15,
        employee_id: 15,
        position_id: 5,
        office_id: 5,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD016",
        user_id: 16,
        employee_id: 16,
        position_id: 5,
        office_id: 5,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD017",
        user_id: 17,
        employee_id: 17,
        position_id: 5,
        office_id: 6,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD018",
        user_id: 18,
        employee_id: 18,
        position_id: 5,
        office_id: 6,
        salary_id: 5,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD019", // nhân viên
        user_id: 19,
        employee_id: 19,
        position_id: 6,
        office_id: 3,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD020",
        user_id: 20,
        employee_id: 20,
        position_id: 6,
        office_id: 3,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD021",
        user_id: 21,
        employee_id: 21,
        position_id: 6,
        office_id: 3,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD022",
        user_id: 22,
        employee_id: 22,
        position_id: 6,
        office_id: 3,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD023",
        user_id: 23,
        employee_id: 23,
        position_id: 6,
        office_id: 3,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD024",
        user_id: 24,
        employee_id: 24,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD025",
        user_id: 25,
        employee_id: 25,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD026",
        user_id: 26,
        employee_id: 26,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD027",
        user_id: 27,
        employee_id: 27,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD028",
        user_id: 28,
        employee_id: 28,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD029",
        user_id: 29,
        employee_id: 29,
        position_id: 6,
        office_id: 4,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD030",
        user_id: 30,
        employee_id: 30,
        position_id: 6,
        office_id: 5,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD031",
        user_id: 31,
        employee_id: 31,
        position_id: 6,
        office_id: 5,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD032",
        user_id: 32,
        employee_id: 32,
        position_id: 6,
        office_id: 5,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD033",
        user_id: 33,
        employee_id: 33,
        position_id: 6,
        office_id: 5,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD034",
        user_id: 34,
        employee_id: 34,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD035",
        user_id: 35,
        employee_id: 35,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD036",
        user_id: 36,
        employee_id: 36,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD037",
        user_id: 37,
        employee_id: 37,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD038",
        user_id: 38,
        employee_id: 38,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD039",
        user_id: 39,
        employee_id: 39,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      },
      {
        // MaHD: "HD040",
        user_id: 40,
        employee_id: 40,
        position_id: 6,
        office_id: 6,
        salary_id: 6,
        literacy_id: 1,
        NgayVaoLam: "2019-01-01 10:00:00"
      }
    ])
  }
}

module.exports = LabourContractSeeder

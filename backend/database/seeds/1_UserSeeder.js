'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use("App/Models/User")

class UserSeeder {
  async run () {
    await User.createMany([
      {
        // MaNhanVien: "NV001",
        email: "admin@gmail.com",
        password: "admin"
      },
      {
        // MaNhanVien: "NV002",
        email: "admin1@gmail.com",
        password: "admin"
      },
      {
        email: "hcmus1@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus2@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus3@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus4@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus5@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus6@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus7@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus8@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus9@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus10@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus11@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus12@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus13@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus14@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus15@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus16@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus17@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus18@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus19@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus20@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus21@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus22@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus23@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus24@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus25@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus26@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus27@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus28@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus29@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus30@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus31@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus32@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus33@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus34@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus35@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus36@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus37@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus38@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus39@gmail.com",
        password: "hcmus"
      },
      {
        email: "hcmus40@gmail.com",
        password: "hcmus"
      }
    ])
  }
}

module.exports = UserSeeder

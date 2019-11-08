'use strict'

/*
|--------------------------------------------------------------------------
| AddressSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Address = use("App/Models/Address")

class AddressSeeder {
  async run () {
    await Address.createMany([
      { id: 1, title: "Thành phố Hà Nội" },
      { id: 2, title: "Tỉnh Hà Giang" },
      { id: 4, title: "Tỉnh Cao Bằng" },
      { id: 6, title: "Tỉnh Bắc Kạn" },
      { id: 8, title: "Tỉnh Tuyên Quang" },
      { id: 10, title: "Tỉnh Lào Cai" },
      { id: 11, title: "Tỉnh Điện Biên" },
      { id: 12, title: "Tỉnh Lai Châu" },
      { id: 14, title: "Tỉnh Sơn La" },
      { id: 15, title: "Tỉnh Yên Bái" },
      { id: 17, title: "Tỉnh Hoà Bình" },
      { id: 19, title: "Tỉnh Thái Nguyên" },
      { id: 20, title: "Tỉnh Lạng Sơn" },
      { id: 22, title: "Tỉnh Quảng Ninh" },
      { id: 24, title: "Tỉnh Bắc Giang" },
      { id: 25, title: "Tỉnh Phú Thọ" },
      { id: 26, title: "Tỉnh Vĩnh Phúc" },
      { id: 27, title: "Tỉnh Bắc Ninh" },
      { id: 30, title: "Tỉnh Hải Dương" },
      { id: 31, title: "Thành phố Hải Phòng" },
      { id: 33, title: "Tỉnh Hưng Yên" },
      { id: 34, title: "Tỉnh Thái Bình" },
      { id: 35, title: "Tỉnh Hà Nam" },
      { id: 36, title: "Tỉnh Nam Định" },
      { id: 37, title: "Tỉnh Ninh Bình" },
      { id: 38, title: "Tỉnh Thanh Hóa" },
      { id: 40, title: "Tỉnh Nghệ An" },
      { id: 42, title: "Tỉnh Hà Tĩnh" },
      { id: 44, title: "Tỉnh Quảng Bình" },
      { id: 45, title: "Tỉnh Quảng Trị" },
      { id: 46, title: "Tỉnh Thừa Thiên Huế" },
      { id: 48, title: "Thành phố Đà Nẵng" },
      { id: 49, title: "Tỉnh Quảng Nam" },
      { id: 51, title: "Tỉnh Quảng Ngãi" },
      { id: 52, title: "Tỉnh Bình Định" },
      { id: 54, title: "Tỉnh Phú Yên" },
      { id: 56, title: "Tỉnh Khánh Hòa" },
      { id: 58, title: "Tỉnh Ninh Thuận" },
      { id: 60, title: "Tỉnh Bình Thuận" },
      { id: 62, title: "Tỉnh Kon Tum" },
      { id: 64, title: "Tỉnh Gia Lai" },
      { id: 66, title: "Tỉnh Đắk Lắk" },
      { id: 67, title: "Tỉnh Đắk Nông" },
      { id: 68, title: "Tỉnh Lâm Đồng" },
      { id: 70, title: "Tỉnh Bình Phước" },
      { id: 72, title: "Tỉnh Tây Ninh" },
      { id: 74, title: "Tỉnh Bình Dương" },
      { id: 75, title: "Tỉnh Đồng Nai" },
      { id: 77, title: "Tỉnh Bà Rịa - Vũng Tàu" },
      { id: 79, title: "Thành phố Hồ Chí Minh" },
      { id: 80, title: "Tỉnh Long An" },
      { id: 82, title: "Tỉnh Tiền Giang" },
      { id: 83, title: "Tỉnh Bến Tre" },
      { id: 84, title: "Tỉnh Trà Vinh" },
      { id: 86, title: "Tỉnh Vĩnh Long" },
      { id: 87, title: "Tỉnh Đồng Tháp" },
      { id: 89, title: "Tỉnh An Giang" },
      { id: 91, title: "Tỉnh Kiên Giang" },
      { id: 92, title: "Thành phố Cần Thơ" },
      { id: 93, title: "Tỉnh Hậu Giang" },
      { id: 94, title: "Tỉnh Sóc Trăng" },
      { id: 95, title: "Tỉnh Bạc Liêu" },
      { id: 96, title: "Tỉnh Cà Mau" }
    ]);
  }
}

module.exports = AddressSeeder

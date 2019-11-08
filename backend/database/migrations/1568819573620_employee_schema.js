'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references("id")
        .inTable("users")

      table.integer('permision_id')
        .unsigned()
        .references("id")
        .inTable("permisions")
        .defaultsTo(6)

      table.integer('licensed')
        .unsigned()
        .defaultsTo(0)

      // table.string('MaNhanVien', 5).notNullable().unique()
      // table.string('MaPB', 5).references('MaPB').inTable('offices')
      // table.string('MaHD', 5).references('MaHD').inTable('labour_contracts')
      // table.string('MaHeSoLuong', 5).references('MaHeSoLuong').inTable('labour_contracts')
      table.string('name', 100).collate('utf8_unicode_ci')
      table
        .enum("gender", ["MALE", "FEMALE", "UNKWON"])
        .defaultsTo("MALE");


      table.datetime('day_of_birth').notNullable()
      table.string('identity_card_number', 12)
      table.string('phone_number', 10)
      table.string('address', 255).collate('utf8_unicode_ci')
      table.string('native_place', 255).collate('utf8_unicode_ci')
      table.string('nationality', 10).collate('utf8_unicode_ci')
      table.string('email', 255).notNullable()
      table.string('marital_status', 30).collate('utf8_unicode_ci')
      table.string('avatar', 255).defaultsTo('img/hinhnhanvien.png');
      table.string('fingerprint_image', 255).defaultsTo('img/hinhnhanvien.png');

      // table.boolean("is_active").defaultsTo(false);

      table.timestamps(true, true)
    })

    // this.create("account_has_user", table => {
    //   table.increments()
    //   table
    //     .integer("employee_id")
    //     .unsigned()
    //     .references("id")
    //     .inTable("employees");
    //   table
    //     .integer("user_id")
    //     .unsigned()
    //     .references("id")
    //     .inTable("users")
    // })
  }

  down () {
    this.dropIfExists('employees')
  }
}

module.exports = EmployeeSchema

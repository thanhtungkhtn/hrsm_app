'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

// bảng chấm công
class MakeSalary extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
}

module.exports = MakeSalary

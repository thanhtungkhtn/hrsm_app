'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

// bảng công
class AggregateSalary extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  salary() {
    return this.belongsTo('App/Models/Salary');
  }
  exportsalary() {
    return this.belongsTo('App/Models/TableTimeSalary');
  }
}

module.exports = AggregateSalary

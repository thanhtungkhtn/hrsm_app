'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

// bảng lương
class ExportSalary extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  salary() {
    return this.belongsTo('App/Models/Salary');
  }
  aggregateSalary() {
    return this.belongsTo('App/Models/Timesheet');
  }
}

module.exports = ExportSalary


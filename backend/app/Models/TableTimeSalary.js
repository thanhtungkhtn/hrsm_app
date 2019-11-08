'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TableTimeSalary extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  salary() {
    return this.belongsTo('App/Models/Salary');
  }
  timesheet() {
    return this.belongsTo('App/Models/Timesheet');
  }
}

module.exports = TableTimeSalary

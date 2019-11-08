'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Timesheet extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  salary() {
    return this.belongsTo('App/Models/Salary');
  }
  tableTimeSalary() {
    return this.belongsTo('App/Models/TableTimeSalary');
  }
}

module.exports = Timesheet

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Salary extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  labour_contract() {
    return this.hasMany('App/Models/LabourContract');
  }
  tableTimeSalary() {
    return this.hasMany('App/Models/TableTimeSalary');
  }
  timesheet() {
    return this.hasMany('App/Models/Timesheet');
  }
}

module.exports = Salary

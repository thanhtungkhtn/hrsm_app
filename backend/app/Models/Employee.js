'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
  permision() {
    return this.belongsTo('App/Models/Permision');
  }

  address() {
    return this.hasMany('App/Models/Address')
  }
  dayOff() {
    return this.hasMany('App/Models/DayOff');
  }
  makeSalary() {
    return this.hasMany('App/Models/MakeSalary');
  }
  insurranceEmployee() {
    return this.hasOne('App/Models/InsurranceEmployee');
  }
  labour_contract() {
    return this.hasOne('App/Models/LabourContract');
  }
  literacy() {
    return this.hasMany('App/Models/Literacy');
  }
  office() {
    return this.hasOne('App/Models/Office');
  }
  positonDetail() {
    return this.hasMany('App/Models/PositonDetail');
  }
  positionAllowance() {
    return this.hasMany('App/Models/PositionAllowance');
  }
  relative() {
    return this.hasMany('App/Models/Relative');
  }
  reward_and_punishment() {
    return this.hasMany('App/Models/RewardAndPunishment');
  }
  exportsalary() {
    return this.hasMany('App/Models/ExportSalary');
  }
  aggregateSalary() {
    return this.hasMany('App/Models/Timesheet');
  }
}

module.exports = Employee

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LabourContract extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  position() {
    return this.belongsTo('App/Models/Position')
  }

  office() {
    return this.belongsTo('App/Models/Office')
  }

  salary() {
    return this.belongsTo('App/Models/Salary')
  }
  literacy() {
    return this.belongsTo('App/Models/Literacy')
  }

  insurrance_employee() {
    return this.belongsTo('App/Models/InsurranceEmployee')
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = LabourContract

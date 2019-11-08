'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InsurranceEmployee extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  labour_contract() {
    return this.hasOne('App/Models/LabourContract');
  }
  insurrance() {
    return this.belongsTo('App/Models/Insurrance');
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = InsurranceEmployee

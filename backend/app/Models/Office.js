'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Office extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  labour_contract() {
    return this.hasMany('App/Models/LabourContract');
  }
}

module.exports = Office

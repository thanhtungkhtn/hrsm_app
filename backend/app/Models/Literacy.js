'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Literacy extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  labourcontract() {
    return this.hasMany('App/Models/LabourContract');
  }
}

module.exports = Literacy

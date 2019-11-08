'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Position extends Model {
  employee() {
    return this.hasOne('App/Models/Employee');
  }
  labour_contract() {
    return this.hasOne('App/Models/LabourContract');
  }
}

module.exports = Position

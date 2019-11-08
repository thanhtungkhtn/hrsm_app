'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Insurrance extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  insurrance_employee() {
    return this.hasOne('App/Models/InsurranceEmployee');
  }
}

module.exports = Insurrance

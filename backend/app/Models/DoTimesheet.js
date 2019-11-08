'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DoTimesheet extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
}

module.exports = DoTimesheet

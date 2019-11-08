'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Relative extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Relative

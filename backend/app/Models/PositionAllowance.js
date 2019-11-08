'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PositionAllowance extends Model {
  employee() {
    return this.belongsTo('App/Models/Employee');
  }
  position() {
    return this.belongsTo('App/Models/Position');
  }
}

module.exports = PositionAllowance

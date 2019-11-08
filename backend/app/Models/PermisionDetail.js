'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PermisionDetail extends Model {
  permision() {
    return this.belongsTo('App/Models/Permision');
  }
}

module.exports = PermisionDetail

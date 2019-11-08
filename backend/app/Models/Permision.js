'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permision extends Model {
  permisionDetail(){
    return this.hasMany('App/Models/PermisionDetail')
  }
  employee() {
    return this.hasOne('App/Models/Employee');
  }
}

module.exports = Permision

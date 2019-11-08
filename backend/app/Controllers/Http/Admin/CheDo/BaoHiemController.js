'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

/** @type {import('datatables.net-editor-server')} */
const { Editor, Field } = use("datatables.net-editor-server");

/** @type {import('../../../../../providers/src/DataTables/DataTables')} */
// const DataTables = use("DataTables");

const Office = use('App/Models/Office')
const User = use('App/Models/User')
const PermisionDetail = use('App/Models/PermisionDetail')
const Position = use('App/Models/Position')
const Employee = use('App/Models/Employee')
const Insurrance = use('App/Models/Insurrance')
const InsurranceEmployee = use('App/Models/InsurranceEmployee')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with baohiems
 */
class BaoHiemController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all baohiems.
   * GET baohiems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const insurrances = await Insurrance.query()
      .with('insurrance_employee', insurrance_employee => {
        insurrance_employee.with('employee')
      })
      .fetch()

    AuthorizationService.verifyPermission(
      insurrances,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: insurrances
    })
  }

  /**
   * Render a form to be used for creating a new baohiem.
   * GET baohiems/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new baohiem.
   * POST baohiems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    AuthorizationService.verifyPermission(
      user,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'CREATE')
    )

    const new_insurrance = await Insurrance.create({
      type: request.input('type'),
      card_number: request.input('card_number'),
      insurance_money: request.input('insurance_money'),
      day_of_issue: request.input('day_of_issue'),
      expiration_date: request.input('expiration_date'),
      place_of_issue: request.input('place_of_issue')
    })

    return response.json({
        status: 'success',
        message: 'insurrance created!',
        data: new_insurrance
    })
  }

  /**
   * Display a single baohiem.
   * GET baohiems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing baohiem.
   * GET baohiems/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update baohiem details.
   * PUT or PATCH baohiems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let insurrance_update = await Insurrance.find(params.id);

    AuthorizationService.verifyPermission(
      insurrance_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    insurrance_update.merge(request.only([
      'type',
      'card_number',
      'insurance_money',
      'day_of_issue',
      'expiration_date',
      'place_of_issue'
    ]));
    await insurrance_update.save()

    return response.json({
        status: 'success',
        message: 'insurrance updated!',
        data: insurrance_update
    })
  }

  /**
   * Delete a baohiem with id.
   * DELETE baohiems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    try {
      const user = auth.current.user
      const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

      let insurrance_destroy = await Insurrance.find(params.id);

      AuthorizationService.verifyPermission(
        insurrance_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, 'DELETE')
      )
      await insurrance_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = BaoHiemController

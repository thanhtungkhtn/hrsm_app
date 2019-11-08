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

const Employee = use('App/Models/Employee')
const User = use('App/Models/User')
const PermisionDetail = use('App/Models/PermisionDetail')
const LabourContract = use('App/Models/LabourContract')
const Office = use('App/Models/Office')
const Relative = use('App/Models/Relative')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with thannhans
 */
class ThanNhanController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all thannhans.
   * GET thannhans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const relatives = await Relative.query()
      .with('employee')
      .fetch()

    AuthorizationService.verifyPermission(
      relatives,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: relatives
    })
  }

  /**
   * Render a form to be used for creating a new thannhan.
   * GET thannhans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new thannhan.
   * POST thannhans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single thannhan.
   * GET thannhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing thannhan.
   * GET thannhans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update thannhan details.
   * PUT or PATCH thannhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a thannhan with id.
   * DELETE thannhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    // const auth_user_admin = await auth.getUser()
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let realative_destroy = await Relative.find(params.id);

    AuthorizationService.verifyPermission(
      realative_destroy,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'DELETE')
    )

    await realative_destroy.delete();

    return response.json({
        status: 'success',
        message: 'relative deleted!',
    })
  }
}

module.exports = ThanNhanController

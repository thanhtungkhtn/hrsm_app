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
const LabourContract = use('App/Models/LabourContract')
const Office = use('App/Models/Office')
const Permision = use('App/Models/Permision')
const PermisionDetail = use('App/Models/PermisionDetail')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with permissiondetails
 */
class PermissionDetailController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all permissiondetails.
   * GET permissiondetails
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const permision_details = await PermisionDetail.query()
    .with('permision')
    .fetch()

    AuthorizationService.verifyPermission(
      permision_details,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: permision_details
    })
  }

  /**
   * Render a form to be used for creating a new permissiondetail.
   * GET permissiondetails/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new permissiondetail.
   * POST permissiondetails
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

    const new_permission_detail = await Permision.create({
      permision_id: request.input('permision_id'),
      action_name: request.input('action_name'),
      action_code: request.input('action_code'),
      check_action: request.input('check_action'),
    })

    return response.json({
        status: 'success',
        message: 'permission_detail created!',
        data: new_permission_detail
    })
  }

  /**
   * Display a single permissiondetail.
   * GET permissiondetails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing permissiondetail.
   * GET permissiondetails/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update permissiondetail details.
   * PUT or PATCH permissiondetails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let permission_detail_update = await PermisionDetail.find(params.id);

    AuthorizationService.verifyPermission(
      permission_detail_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    permission_detail_update.merge(request.only([
      'permision_id',
      'action_name',
      'action_code',
      'check_action'
    ]));
    await permission_detail_update.save()

    return response.json({
        status: 'success',
        message: 'permission_detail updated!',
        data: permission_detail_update
    })
  }

  /**
   * Delete a permissiondetail with id.
   * DELETE permissiondetails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let permission_detail_destroy = await PermisionDetail.find(params.id);

    AuthorizationService.verifyPermission(
      permission_detail_destroy,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )
    await permission_detail_destroy.delete();

    return response.json({
        status: 'success',
        message: 'permission deleted!',
    })
  }
}

module.exports = PermissionDetailController

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
const Permision = use('App/Models/Permision')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all permissions.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const permisions = await Permision.query()
    .with('permisionDetail')
    .fetch()

    AuthorizationService.verifyPermission(
      permisions,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: permisions
    })
  }

  /**
   * Render a form to be used for creating a new permission.
   * GET permissions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new permission.
   * POST permissions
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

    const new_permission = await Permision.create({
      name_per: request.input('name_per'),
    })

    return response.json({
        status: 'success',
        message: 'permission created!',
        data: new_permission
    })
  }

  /**
   * Display a single permission.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing permission.
   * GET permissions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update permission details.
   * PUT or PATCH permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let permission_update = await Permision.find(params.id);

    AuthorizationService.verifyPermission(
      permission_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    permission_update.merge(request.only([
      'name_per'
    ]));
    await permission_update.save()

    return response.json({
        status: 'success',
        message: 'permission updated!',
        data: permission_update
    })
  }

  /**
   * Delete a permission with id.
   * DELETE permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    try {
      const user = auth.current.user
      const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

      const permission_destroy = await Permision.find(params.id);

      AuthorizationService.verifyPermission(
        permission_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, 'DELETE')
      )

      await permission_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = PermissionController

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

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with phongbans
 */
class PhongBanController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all phongbans.
   * GET phongbans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const offices = await Office.all()

    AuthorizationService.verifyPermission(
      offices,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: offices
    })
  }

  /**
   * Render a form to be used for creating a new phongban.
   * GET phongbans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new phongban.
   * POST phongbans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    AuthorizationService.verifyPermission(
      user,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'CREATE')
    )

    const new_office = await Office.create({
        name: request.input('name'),
    })

    return response.json({
        status: 'success',
        message: 'office created!',
        data: new_office
    })
  }

  /**
   * Display a single phongban.
   * GET phongbans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing phongban.
   * GET phongbans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update phongban details.
   * PUT or PATCH phongbans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let office_update = await Office.find(params.id);

    AuthorizationService.verifyPermission(
      office_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    office_update.merge(request.only([
      'name'
    ]));
    await office_update.save()

    return response.json({
        status: 'success',
        message: 'office updated!',
        data: office_update
    })
  }

  /**
   * Delete a phongban with id.
   * DELETE phongbans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    try {
      const user = auth.current.user
      const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

      let office_destroy = await Office.find(params.id);

      AuthorizationService.verifyPermission(
        office_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, 'DELETE')
      )
      await office_destroy.delete();

      return true;
    } catch (e) {
      return false;
      // console.error(+ ": " + e.sqlMessage);
    }

  }
}

module.exports = PhongBanController

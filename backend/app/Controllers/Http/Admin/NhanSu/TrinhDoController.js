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
const Literacy = use('App/Models/Literacy')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with trinhdos
 */
class TrinhDoController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all trinhdos.
   * GET trinhdos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const literacies = await Literacy.all()

    AuthorizationService.verifyPermission(
      literacies,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: literacies
    })
  }

  /**
   * Render a form to be used for creating a new trinhdo.
   * GET trinhdos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new trinhdo.
   * POST trinhdos
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

    const new_literacy = await Literacy.create({
        name: request.input('name'),
        professional_coefficient: request.input('professional_coefficient')
    })

    return response.json({
        status: 'success',
        message: 'literacy created!',
        data: new_literacy
    })
  }

  /**
   * Display a single trinhdo.
   * GET trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing trinhdo.
   * GET trinhdos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update trinhdo details.
   * PUT or PATCH trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let literacy_update = await Literacy.find(params.id);

    AuthorizationService.verifyPermission(
      literacy_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    literacy_update.merge(request.only([
      'name',
      'professional_coefficient'
    ]));
    await literacy_update.save()

    return response.json({
        status: 'success',
        message: 'literacy updated!',
        data: literacy_update
    })
  }

  /**
   * Delete a trinhdo with id.
   * DELETE trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    try {
      const user = auth.current.user
      const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

      let literacy_destroy = await Literacy.find(params.id);

      AuthorizationService.verifyPermission(
        literacy_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, 'DELETE')
      )
      await literacy_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = TrinhDoController

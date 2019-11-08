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

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with chucvus
 */
class ChucVuController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    // select @result = check_action from tbl_user as u
    // join tbl_user_per as up on u.id_user = up.id_user
    // join tbl_permision as p on up.id_per = p.id_per
    // join tbl_per_detail as pd on p.id_per = pd.id_per
    // where u.id_user = 2 and up.licensed = 1 and action_code = 'DELETE'

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all chucvus.
   * GET chucvus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const positions = await Position.all()

    AuthorizationService.verifyPermission(
      positions,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: positions
    })
  }

  /**
   * Render a form to be used for creating a new chucvu.
   * GET chucvus/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new chucvu.
   * POST chucvus
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

    const new_position = await Position.create({
        name: request.input('name'),
        basic_salary: request.input('basic_salary'),
        position_coefficient: request.input('position_coefficient'),
        responsibility_coefficient: request.input('responsibility_coefficient'),
    })

    return response.json({
        status: 'success',
        message: 'employee created!',
        data: new_position
    })
  }

  /**
   * Display a single chucvu.
   * GET chucvus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing chucvu.
   * GET chucvus/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update chucvu details.
   * PUT or PATCH chucvus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let position_update = await Position.find(params.id);

    AuthorizationService.verifyPermission(
      position_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    position_update.merge(request.only([
      'name',
      'basic_salary',
      'position_coefficient',
      'responsibility_coefficient'
    ]));
    await position_update.save()

    return response.json({
        status: 'success',
        message: 'position updated!',
        data: position_update
    })
  }

  /**
   * Delete a chucvu with id.
   * DELETE chucvus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const user = auth.current.user
      const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

      let position_destroy = await Position.find(params.id);

      AuthorizationService.verifyPermission(
        position_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, 'DELETE')
      )
      await position_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ChucVuController

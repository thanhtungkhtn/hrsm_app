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
const RewardAndPunishment = use('App/Models/RewardAndPunishment')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with khenthuongkyluats
 */
class KhenThuongKyLuatController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all khenthuongkyluats.
   * GET khenthuongkyluats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {

    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const reward_and_punishments = await RewardAndPunishment.query()
      .with('employee')
      .fetch()

    AuthorizationService.verifyPermission(
      reward_and_punishments,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: reward_and_punishments
    })
  }

  /**
   * Render a form to be used for creating a new khenthuongkyluat.
   * GET khenthuongkyluats/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new khenthuongkyluat.
   * POST khenthuongkyluats
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

    const new_reward_and_punishment = await RewardAndPunishment.create({
      employee_id: request.input('employee_id'),
      type: request.input('type'),
      money: request.input('money'),
      reason: request.input('reason'),
      date: request.input('date'),
    })

    return response.json({
        status: 'success',
        message: 'new reward and punishment created!',
        data: new_reward_and_punishment
    })
  }

  /**
   * Display a single khenthuongkyluat.
   * GET khenthuongkyluats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing khenthuongkyluat.
   * GET khenthuongkyluats/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update khenthuongkyluat details.
   * PUT or PATCH khenthuongkyluats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let reward_and_punishment_update = await RewardAndPunishment.find(params.id);

    AuthorizationService.verifyPermission(
      reward_and_punishment_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    reward_and_punishment_update.merge(request.only([
      'employee_id',
      'type',
      'money',
      'reason',
      'date'
    ]));
    await reward_and_punishment_update.save()

    return response.json({
        status: 'success',
        message: 'insurrance employee updated!',
        data: reward_and_punishment_update
    })
  }

  /**
   * Delete a khenthuongkyluat with id.
   * DELETE khenthuongkyluats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let reward_and_punishment_destroy = await RewardAndPunishment.find(params.id);

    AuthorizationService.verifyPermission(
      reward_and_punishment_destroy,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )
    await reward_and_punishment_destroy.delete();

    return response.json({
        status: 'success',
        message: 'reward Or punishment deleted!',
    })
  }
}

module.exports = KhenThuongKyLuatController

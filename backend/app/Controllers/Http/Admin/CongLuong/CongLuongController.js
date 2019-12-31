'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MakeSalary = use('App/Models/MakeSalary')
const AggregateSalary = use('App/Models/AggregateSalary')
const ExportSalary = use('App/Models/ExportSalary')
const PermisionDetail = use('App/Models/PermisionDetail')

const AuthorizationService = use('App/Services/AuthorizationService')

/**
 * Resourceful controller for interacting with congluongs
 */
class CongLuongController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  async cong({ request, response, view, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const cong = await MakeSalary.query().fetch()

    AuthorizationService.verifyPermission(
      cong,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: cong
    })
  }

  async bangcong({ request, response, view, auth}) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const bangcong = await AggregateSalary.query().fetch()

    AuthorizationService.verifyPermission(
      bangcong,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: bangcong
    })
  }

  async bangluong({ request, response, view, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const bangluong = await ExportSalary.query().fetch()

    AuthorizationService.verifyPermission(
      bangluong,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: bangluong
    })
  }

  async updateCong({ request, response, view, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let make_salary_update = await MakeSalary.find(params.id);

    AuthorizationService.verifyPermission(
      make_salary_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    make_salary_update.merge(request.only([
      'employee_id',
      'date',
      'check_in',
      'check_out',
      'date_work'
    ]));
    await make_salary_update.save()

    return response.json({
        status: 'success',
        message: 'make salary updated!',
        data: make_salary_update
    })
  }

  async updateBangCong({ request, response, view, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let aggregate_salary_update = await AggregateSalary.find(params.id);

    AuthorizationService.verifyPermission(
      aggregate_salary_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    aggregate_salary_update.merge(request.only([
      'employee_id',
      'date_work',
      'months_work'
    ]));
    await aggregate_salary_update.save()

    return response.json({
        status: 'success',
        message: 'aggregate_salary updated!',
        data: aggregate_salary_update
    })
  }

  async updateBangLuong({ request, response, view, auth }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let export_salary_update = await ExportSalary.find(params.id);

    AuthorizationService.verifyPermission(
      export_salary_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    export_salary_update.merge(request.only([
      'employee_id',
      'aggregate_salary_id',
      'position_allowance',
      'insurrance_employee',
      'TienThuongPhat',
      'months_salary',
      'TongLuong'
    ]));
    await export_salary_update.save()

    return response.json({
        status: 'success',
        message: 'export_salary updated!',
        data: export_salary_update
    })
  }

  /**
   * Show a list of all congluongs.
   * GET congluongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new congluong.
   * GET congluongs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new congluong.
   * POST congluongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single congluong.
   * GET congluongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing congluong.
   * GET congluongs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update congluong details.
   * PUT or PATCH congluongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a congluong with id.
   * DELETE congluongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CongLuongController

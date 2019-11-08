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
 * Resourceful controller for interacting with insurranceemployees
 */
class InsurranceEmployeeController {

  async checkActionPermission(permision_id, action_code) { // kiểm tra quyền thực hiện

    let result =  await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select('check_action')
      .firstOrFail()

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all insurranceemployees.
   * GET insurranceemployees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    const insurrance_employees = await InsurranceEmployee.query()
      .with('employee')
      .with('insurrance')
      .fetch()

    AuthorizationService.verifyPermission(
      insurrance_employees,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'VIEW')
    );

    return response.json({
        user: user,
        results: insurrance_employees
    })
  }

  /**
   * Render a form to be used for creating a new insurranceemployee.
   * GET insurranceemployees/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new insurranceemployee.
   * POST insurranceemployees
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

    const new_insurrance_employee = await InsurranceEmployee.create({
      user_id: request.input('user_id'),
      employee_id: request.input('employee_id'),
      insurrance_id: request.input('insurrance_id')
    })

    return response.json({
        status: 'success',
        message: 'new insurrance employee created!',
        data: new_insurrance_employee
    })
  }

  /**
   * Display a single insurranceemployee.
   * GET insurranceemployees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing insurranceemployee.
   * GET insurranceemployees/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update insurranceemployee details.
   * PUT or PATCH insurranceemployees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let insurrance_employee_update = await InsurranceEmployee.find(params.id);

    AuthorizationService.verifyPermission(
      insurrance_employee_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )

    insurrance_employee_update.merge(request.only([
      'user_id',
      'employee_id',
      'insurrance_id'
    ]));
    await insurrance_employee_update.save()

    return response.json({
        status: 'success',
        message: 'insurrance employee updated!',
        data: insurrance_employee_update
    })
  }

  /**
   * Delete a insurranceemployee with id.
   * DELETE insurranceemployees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = auth.current.user
    const user_employee = await user.employee().select('licensed', 'permision_id').fetch() // xác thực quyền

    let insurrance_employee_destroy = await InsurranceEmployee.find(params.id);

    AuthorizationService.verifyPermission(
      insurrance_employee_destroy,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, 'EDIT')
    )
    await insurrance_employee_destroy.delete();

    return response.json({
        status: 'success',
        message: 'insurrance employee deleted!',
    })
  }
}

module.exports = InsurranceEmployeeController

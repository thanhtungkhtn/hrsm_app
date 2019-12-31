"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

/** @type {import('moment')} */
const moment = use("moment");

/** @type {import('datatables.net-editor-server')} */
const { Editor, Field } = use("datatables.net-editor-server");

/** @type {import('../../../../../providers/src/DataTables/DataTables')} */
// const DataTables = use("DataTables");

const Employee = use("App/Models/Employee");
const User = use("App/Models/User");
const PermisionDetail = use("App/Models/PermisionDetail");
const LabourContract = use("App/Models/LabourContract");

const AuthorizationService = use("App/Services/AuthorizationService");

/**
 * Resourceful controller for interacting with employees
 */
class EmployeeController {
  get timeWork() {
    return moment().format("HH:mm:ss");
  }

  get monthWork() {
    return moment().format("MM");
  }

  get getDate() {
    return moment().format("YYYY-MM-DD");
  }

  async checkActionPermission(permision_id, action_code) {
    // kiểm tra quyền thực hiện

    // select @result = check_action from tbl_user as u
    // join tbl_user_per as up on u.id_user = up.id_user
    // join tbl_permision as p on up.id_per = p.id_per
    // join tbl_per_detail as pd on p.id_per = pd.id_per
    // where u.id_user = 2 and up.licensed = 1 and action_code = 'DELETE'

    let result = await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select("check_action")
      .firstOrFail();

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all employees.
   * Only admin can fetch list all employees
   * GET employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    // const auth_user_admin = await auth.getUser()
    const user = auth.current.user;
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    const employees = await Employee.all();

    AuthorizationService.verifyPermission(
      employees,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "VIEW")
    );

    return response.json({
      user: user,
      results: employees
    });
    // return await Employee.query().paginate(page ? page : 1, 10);
  }

  /**
   * Render a form to be used for creating a new employee.
   * GET employees/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new employee.
   * POST employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.current.user;
    // const auth_user_admin = await auth.getUser()
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    // const employees = await Employee.all()

    AuthorizationService.verifyPermission(
      user,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "CREATE")
    );
    const new_user = await User.create({
      email: request.input("email"),
      password: "hcmus" // request.input('password')
    });

    const new_employee = await Employee.create({
      user_id: new_user.id,
      name: request.input("name"),
      day_of_birth: request.input("day_of_birth"),
      identity_card_number: request.input("identity_card_number"),
      native_place: request.input("native_place"),
      nationality: request.input("nationality"),
      email: new_user.email
    });

    await LabourContract.create({
      user_id: new_user.id,
      employee_id: new_employee.id,
      NgayVaoLam: this.getDate
    });

    // await LabourContract.create({
    //   user_id: new_user.id,
    //   employee_id: new_employee.id,
    //   position_id: 6,
    //   office_id: 6,
    //   salary_id: 8,
    //   literacy_id: 1,
    //   insurrance_employee_id: 1,
    //   NgayVaoLam: this.getDate()
    // });

    return response.json({
      status: "success",
      message: "employee created!",
      data: new_employee
    });
  }

  /**
   * Display a single employee.
   * GET employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing employee.
   * GET employees/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update employee details.
   * PUT or PATCH employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    // const auth_user_admin = await auth.getUser()
    const user = auth.current.user;
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    let employees_update = await Employee.find(params.id);

    AuthorizationService.verifyPermission(
      employees_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "EDIT")
    );

    employees_update.merge(
      request.only([
        // 'id',
        "user_id",
        "permision_id",
        "licensed",
        "name",
        "gender",
        "day_of_birth",
        "identity_card_number",
        "phone_number",
        "address",
        "native_place",
        "nationality",
        "email",
        "marital_status",
        "avatar",
        "fingerprint_image"
      ])
    );
    await employees_update.save();

    return response.json({
      status: "success",
      message: "employee created!",
      data: employees_update
    });
  }

  /**
   * Delete a employee with id.
   * DELETE employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    try {
      // const auth_user_admin = await auth.getUser()
      const user = auth.current.user;
      const user_employee = await user
        .employee()
        .select("licensed", "permision_id")
        .fetch(); // xác thực quyền

      let employees_destroy = await Employee.find(params.id);

      AuthorizationService.verifyPermission(
        employees_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, "DELETE")
      );

      await employees_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = EmployeeController;

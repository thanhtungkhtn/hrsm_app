"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('moment')} */
const moment = use("moment");

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

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
 * Resourceful controller for interacting with hopdongs
 */
class HopDongController {
  get getDate() {
    return moment().format("YYYY-MM-DD");
  }

  async checkActionPermission(permision_id, action_code) {
    // kiểm tra quyền thực hiện

    let result = await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select("check_action")
      .firstOrFail();

    return result.toJSON().check_action;
  }

  /**
   * Show a list of all hopdongs.
   * GET hopdongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {
    const user = auth.current.user;
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    const labour_contracts = await LabourContract.query()
      .with("user")
      .with("employee")
      .with("position")
      .with("office")
      .with("salary")
      .with("literacy")
      .with("insurrance_employee", insurrance_employee => {
        insurrance_employee.with("insurrance");
      })
      .fetch();

    // const users = user.getRelated('labour_contracts')

    AuthorizationService.verifyPermission(
      labour_contracts,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "VIEW")
    );

    return response.json({
      user: user,
      results: labour_contracts
    });
  }

  /**
   * Render a form to be used for creating a new hopdong.
   * GET hopdongs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new hopdong.
   * POST hopdongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const user = auth.current.user;
    // const auth_user_admin = await auth.getUser()
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    AuthorizationService.verifyPermission(
      user,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "CREATE")
    );

    const new_labour_contract = await LabourContract.create({
      user_id: request.input("user_id"),
      employee_id: request.input("employee_id"),
      position_id: request.input("position_id"),
      office_id: request.input("office_id"),
      salary_id: request.input("salary_id"),
      literacy_id: request.input("literacy_id"),
      insurrance_employee_id: request.input("insurrance_employee_id"),
      NgayVaoLam: request.input("NgayVaoLam")
    });

    return response.json({
      status: "success",
      message: "labour_contract created!"
      // data: new_labour_contract
    });
  }

  /**
   * Display a single hopdong.
   * GET hopdongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing hopdong.
   * GET hopdongs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update hopdong details.
   * PUT or PATCH hopdongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    // const auth_user_admin = await auth.getUser()
    const user = auth.current.user;
    const user_employee = await user
      .employee()
      .select("licensed", "permision_id")
      .fetch(); // xác thực quyền

    let labour_contract_update = await LabourContract.find(params.id);

    AuthorizationService.verifyPermission(
      labour_contract_update,
      user_employee.licensed,
      await this.checkActionPermission(user_employee.permision_id, "EDIT")
    );

    labour_contract_update.merge(
      request.only([
        "user_id",
        "employee_id",
        "position_id",
        "office_id",
        "salary_id",
        "literacy_id",
        "insurrance_employee_id",
        "NgayVaoLam"
      ])
    );
    await labour_contract_update.save();

    return response.json({
      status: "success",
      message: "labour_contract created!",
      data: labour_contract_update
    });
  }

  /**
   * Delete a hopdong with id.
   * DELETE hopdongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {
    try {
      const user = auth.current.user;
      const user_employee = await user
        .employee()
        .select("licensed", "permision_id")
        .fetch(); // xác thực quyền

      let labour_contract_destroy = await LabourContract.find(params.id);

      AuthorizationService.verifyPermission(
        labour_contract_destroy,
        user_employee.licensed,
        await this.checkActionPermission(user_employee.permision_id, "DELETE")
      );

      await labour_contract_destroy.delete();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = HopDongController;

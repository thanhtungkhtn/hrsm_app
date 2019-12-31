"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

const User = use("App/Models/User");
const PermisionDetail = use("App/Models/PermisionDetail");

const Employee = use("App/Models/Employee");
const LabourContract = use("App/Models/LabourContract");
const InsurranceEmployee = use("App/Models/InsurranceEmployee");

const Hash = use("Hash");
const Ws = use("Ws");

/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
  /**
   * Show a list of all permissions.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth, response, view }) {
    const user = auth.current.user;

    const query = await Database.raw(
      `
      SELECT name_per, action_name, action_code
      FROM users as u
      join employees as up on u.id = up.user_id
      join permisions as p on up.permision_id = p.id
      join permision_details as pd on p.id = pd.permision_id
      where u.id = '${user.id}' and up.licensed = 1 and pd.check_action = 1
      `
    );

    return response.json({
      user: user,
      results: query[0]
      // results: query[0].map(item => item.action_code),
      // results: query,
    });
  }
}

module.exports = PermissionController;

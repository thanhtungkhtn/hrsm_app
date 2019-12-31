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
 * Resourceful controller for interacting with hopdongs
 */
class HopDongController {
  /**
   * Show a list of all hopdongs.
   * GET hopdongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth, view }) {
    // const user = auth.current.user
    // const results = await user.employee().fetch()

    return response.json({
      // user: user,
      // results: query[0].map(item => item.action_code),
      // results: await results.labour_contract().fetch()
      results: await LabourContract.query()
        .where("user_id", auth.current.user.id)
        .with("user")
        .with("employee")
        .with("position")
        .with("office")
        .with("salary")
        .with("literacy")
        .with("insurrance_employee", insurrance_employee => {
          insurrance_employee.with("insurrance");
        })

        .firstOrFail()
      // tweet.loadMany(['user', 'favorites', 'replies'])
    });
  }
}

module.exports = HopDongController;

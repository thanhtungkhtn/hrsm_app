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
const Relative = use("App/Models/Relative");

const Hash = use("Hash");
const Ws = use("Ws");

/**
 * Resourceful controller for interacting with thanhnhans
 */
class ThanNhanController {
  /**
   * Show a list of all thanhnhans.
   * GET thanhnhans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth, view }) {
    const user = auth.current.user;
    const results = await user.employee().fetch();

    return response.json({
      user: user,
      results: await results.relative().fetch()
    });
  }

  /**
   * Create/save a new thanhnhan.
   * POST thanhnhans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const user = auth.current.user;

      const new_ = await Relative.create({
        employee_id: user.id,
        name: request.input("name"),
        relationship: request.input("relationship")
      });

      return response.json({
        status: "success",
        message: "Relation created!",
        new_relative: new_
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Something problem"
      });
    }
  }

  /**
   * Update thanhnhan details.
   * PUT or PATCH thanhnhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const user = await auth.getUser();
    // const employee = await user.employee().fetch();
    let upRealtive = await Relative.find(params.id);

    upRealtive.merge(request.only(["name", "relationship"]));
    await upRealtive.save();

    return upRealtive;
  }

  /**
   * Delete a thanhnhan with id.
   * DELETE thanhnhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    // get currently authenticated user
    const user = auth.current.user;
    // const employee = await user.employee().fetch();
    const realtive = await Relative.find(params.id);

    await realtive.delete();

    return response.json({
      status: "success",
      message: "Your Realtive deleted!",
      data: await Relative.query().fetch()
    });
  }
}

module.exports = ThanNhanController;

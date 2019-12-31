"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

const Literacy = use("App/Models/Literacy");

/**
 * Resourceful controller for interacting with trinhdos
 */
class TrinhDoController {
  /**
   * Show a list of all trinhdos.
   * GET trinhdos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const user = auth.current.user;
    const results = await user.employee().fetch();

    return response.json({
      user: user,
      results: await results.literacy().fetch()
    });
  }

  /**
   * Update trinhdo details.
   * PUT or PATCH trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await auth.getUser();
    // const employee = await user.employee().fetch();
    let upLiteracy = await Literacy.find(params.id);
    upLiteracy.merge(request.only(["name", "major"]));
    await upLiteracy.save();

    return upLiteracy;
  }

  /**
   * Delete a trinhdo with id.
   * DELETE trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = TrinhDoController;

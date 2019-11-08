'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

const User = use('App/Models/User')
const PermisionDetail = use('App/Models/PermisionDetail')

const Employee = use('App/Models/Employee')
const LabourContract = use('App/Models/LabourContract')
const InsurranceEmployee = use('App/Models/InsurranceEmployee')
const Literacy = use('App/Models/Literacy')

const Hash = use('Hash')
const Ws = use('Ws')

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
  async index ({ request, response, view, auth }) {
    const user = auth.current.user
    const results = await user.employee().fetch()


    return response.json({
        user: user,
        // results: query[0].map(item => item.action_code),
        results: await results.literacy().fetch()
    })
  }

  /**
   * Render a form to be used for creating a new trinhdo.
   * GET trinhdos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new trinhdo.
   * POST trinhdos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single trinhdo.
   * GET trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing trinhdo.
   * GET trinhdos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update trinhdo details.
   * PUT or PATCH trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const user = await auth.getUser();
    const employee = await user.employee().fetch()

    // const upRealtive = await Relative.query()
    // .where('employee_id', employee.id)
    // .where('id', params.id)
    // .firstOrFail()


    let upLiteracy = await Literacy.find(params.id);

    // luc update bi valide ??

    // const name = request.input('name')
    // const email = request.input('email')
    // const title = request.input('title')
    // const tel = request.input('tel')

    // AuthorizationService.verifyPermission(contact, user);

    // contact.name = name
    // contact.email = email
    // contact.title = title
    // contact.tel = tel

    upLiteracy.merge(request.only([
      'name',
      'major',
    ]));
    await upLiteracy.save()

    return upLiteracy
  }

  /**
   * Delete a trinhdo with id.
   * DELETE trinhdos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TrinhDoController

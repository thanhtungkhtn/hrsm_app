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

const Hash = use('Hash')
const Ws = use('Ws')

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
  async index ({ request, response, auth, view }) {
    // const user = auth.current.user
    // const results = await user.employee().fetch()


    return response.json({
        // user: user,
        // results: query[0].map(item => item.action_code),
        // results: await results.labour_contract().fetch()
        results: await LabourContract.query().where('user_id', auth.current.user.id)
                                              .with('user')
                                              .with('employee')
                                              .with('position')
                                              .with('office')
                                              .with('salary')
                                              .with('literacy')
                                              .with('insurrance_employee', insurrance_employee => {
                                                insurrance_employee.with('insurrance')
                                              })

                                              .firstOrFail()
                                              // tweet.loadMany(['user', 'favorites', 'replies'])
    })
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
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new hopdong.
   * POST hopdongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing hopdong.
   * GET hopdongs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update hopdong details.
   * PUT or PATCH hopdongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a hopdong with id.
   * DELETE hopdongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = HopDongController

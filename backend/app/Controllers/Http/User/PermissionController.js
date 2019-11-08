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
  async index ({ request, auth, response, view }) {
    const user = auth.current.user

    const query = await Database.raw(
      // `
      // SELECT DATE(created_at) label,
      // SUM(case when status = 'RESOLVE' then 1 else 0 end) as resolve,
      // SUM(case when status = 'REJECT' then 1 else 0 end) as reject
      // FROM bookings WHERE DATE(created_at) BETWEEN '${startDate}' AND '${endDate}'
      // GROUP BY label
      // `
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
        results: query[0],
        // results: query[0].map(item => item.action_code),
        // results: query,
    })
  }

  /**
   * Render a form to be used for creating a new permission.
   * GET permissions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new permission.
   * POST permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single permission.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing permission.
   * GET permissions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update permission details.
   * PUT or PATCH permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a permission with id.
   * DELETE permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PermissionController

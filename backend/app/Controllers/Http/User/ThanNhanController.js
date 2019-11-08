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
const Relative = use('App/Models/Relative')

const Hash = use('Hash')
const Ws = use('Ws')

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
  async index ({ request, response, auth, view }) {
    const user = auth.current.user
    const results = await user.employee().fetch()


    return response.json({
        user: user,
        // results: query[0].map(item => item.action_code),
        results: await results.relative().fetch()
    })
  }

  /**
   * Render a form to be used for creating a new thanhnhan.
   * GET thanhnhans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new thanhnhan.
   * POST thanhnhans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
        // const user = await auth.getUser();
        const user = auth.current.user
        // const employee = await user.employee().fetch()

        const new_ = await Relative.create({
          employee_id: user.id,
          name: request.input('name'),
          relationship: request.input('relationship')
        })

        // const name = request.input('name')
        // const email = request.input('email')
        // const title = request.input('title')
        // const tel = request.input('tel')

        // const contact = new Contact()
        // contact.name = name
        // contact.email = email
        // contact.title = title
        // contact.tel = tel

        // await user.contacts().save(contact);

        // return response.json(contact)


        // const userData = request.only(['name', 'username', 'email', 'password'])
        // const user = await User.create(userData)


        // // Save tweet to database
        // const tweet = await Tweet.create({
        //     user_id: user.id,
        //     tweet: request.input('tweet')
        // })

        // // fetch tweet's relations
        // await tweet.loadMany(['user', 'favorites', 'replies'])


        return response.json({
          status: 'success',
          message: 'Relation created!',
          // user: employee.id,
          new_relative: new_
        })
      } catch (error) {
        return response.status(404).json({
            status: 'error',
            message: 'Something problem'
        })
    }
  }

  /**
   * Display a single thanhnhan.
   * GET thanhnhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing thanhnhan.
   * GET thanhnhans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update thanhnhan details.
   * PUT or PATCH thanhnhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const user = await auth.getUser();
    const employee = await user.employee().fetch()

    // const upRealtive = await Relative.query()
    // .where('employee_id', employee.id)
    // .where('id', params.id)
    // .firstOrFail()


    let upRealtive = await Relative.find(params.id);

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

    upRealtive.merge(request.only([
      'name',
      'relationship',
    ]));
    await upRealtive.save()

    return upRealtive
  }

  /**
   * Delete a thanhnhan with id.
   * DELETE thanhnhans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    // get currently authenticated user
    const user = auth.current.user
    const employee = await user.employee().fetch()

    // const realtive = await Relative.query()
    //     .where('employee_id', employee.id)
    //     .where('id', params.id)
    //     .firstOrFail()
    const realtive = await Relative.find(params.id);

    await realtive.delete()

    return response.json({
        status: 'success',
        message: 'Your Realtive deleted!',
        data: await Relative.query().fetch()
    })
  }
}

module.exports = ThanNhanController

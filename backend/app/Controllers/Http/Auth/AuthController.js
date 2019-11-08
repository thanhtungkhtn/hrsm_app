'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ws = use('Ws')

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {

  /**
   * Handles user signup
   *
   * @method signup
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async signup ({ request, auth, response }) {
    // get user data from signup form
    const userData = request.only(['name', 'username', 'email', 'password'])

    console.log("Hello World")

    try {
        // save user to database
        const user = await User.create(userData)
        console.log(user)

        // generate JWT token for user
        const token = await auth.generate(user)

        //await auth.login(user); // not jwt

        //return this.login(...arguments);

        // return response.json({
        //   "user": user,
        //   "message": 'user has been created'
        // })
        // return response.send({
        //   message: 'user has been created'
        // })
        return response.json({
            status: 'success',
            data: token
        })
    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.'
        })
    }
  }

   /**
   * Handles user authentication
   *
   * @method login
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {String|JSON}
   */
  async login ({ request, auth, response }) {

    // let {email, password} = request.all();
    // const email = request.input("email")
    // const password = request.input("password");

    // console.log(TenDangNhap + MatKhau)

    try {
        // const Ws = use('Ws')
        // console.log(Ws)

        const {email, password} = request.only(['email', 'password'])
        console.log(email + password)

        // validate the user credentials and generate a JWT token
        const token = await auth.attempt(email,password)

        // let user = await User.findBy('email', email)
        // let accessToken = await auth.generate(user)
        // Object.assign(user, accessToken)
        // return response.json(user)

        // return response.json({
        //   status: 'success',
        //   message: 'user has successfully logged in',
        //   data: token
        //   //  "user": user,
        //   // "access_token": accessToken
        // })
        // return response.json(token);
        return token;

        // return response.json({
        //     status: 'success',
        //     data: token
        // })
    } catch (error) {
        response.status(400).json({
            status: 'error',
            message: 'Invalid email/password'
        })
    }
  }

  /**
   * Show a list of all auths.
   * GET auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new auth.
   * GET auths/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single auth.
   * GET auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    console.log(params.id)

    const user = await User.find(params.id)
    const res = {
      id: user.id,
      email: user.email,
    }

    //return await user.projects().fetch();

    return response.json(res)
  }

  /**
   * Render a form to update an existing auth.
   * GET auths/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update auth details.
   * PUT or PATCH auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a auth with id.
   * DELETE auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AuthController

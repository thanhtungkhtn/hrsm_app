"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ws = use("Ws");

const User = use("App/Models/User");

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
  async signup({ request, auth, response }) {
    // get user data from signup form
    const userData = request.only(["name", "username", "email", "password"]);

    try {
      // save user to database
      const user = await User.create(userData);
      console.log(user);

      // generate JWT token for user
      const token = await auth.generate(user);

      return response.json({
        status: "success",
        data: token
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        message:
          "There was a problem creating the user, please try again later."
      });
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
  async login({ request, auth, response }) {
    try {
      const { email, password } = request.only(["email", "password"]);
      console.log(email + password);

      // validate the user credentials and generate a JWT token
      const token = await auth.attempt(email, password);

      return token;
    } catch (error) {
      response.status(400).json({
        status: "error",
        message: "Invalid email/password"
      });
    }
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
  async show({ params, request, response, view }) {
    console.log(params.id);

    const user = await User.find(params.id);
    const res = {
      id: user.id,
      email: user.email
    };
    return response.json(res);
  }
}

module.exports = AuthController;

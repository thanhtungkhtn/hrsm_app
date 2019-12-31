"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const PermisionDetail = use("App/Models/PermisionDetail");

const Employee = use("App/Models/Employee");
const LabourContract = use("App/Models/LabourContract");
const InsurranceEmployee = use("App/Models/InsurranceEmployee");

const Hash = use("Hash");
const Ws = use("Ws");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Get details of the currently authenticated user
   *
   * @method me
   *
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async me({ auth, response }) {
    const user = await User.query()
      .where("id", auth.current.user.id)
      .with("employee", employee => {
        // employee.with('user')
        // employee.with('permision')
        // employee.with('relative')
        // // employee.with('literacy')
        // employee.with('labour_contract', labour_contract => {
        //   labour_contract.with('user')
        //   labour_contract.with('employee')
        //   labour_contract.with('position')
        //   labour_contract.with('office')
        //   labour_contract.with('salary')
        //   labour_contract.with('literacy')
        //   labour_contract.with('insurrance_employee', insurrance_employee => {
        //     insurrance_employee.with('insurrance')
        //   })
        // })
      })
      .firstOrFail();

    return response.json({
      status: "success",
      data: user
      // permision: per_d
    });
  }

  /**
   * Update user profile
   *
   * @method updateProfile
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async updateProfile({ request, auth, response }) {
    try {
      let user = await Employee.find(auth.current.user.id);

      user.merge(
        request.only([
          "phone_number",
          "address",
          "marital_status",
          "avatar",
          "fingerprint_image"
        ])
      );
      await user.save();

      return response.json({
        status: "success",
        data: user
        // permision: per_d
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        message: "There was a problem updating profile, please try again later."
      });
    }
  }

  /**
   * Change user password
   *
   * @method changePassword
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async changePassword({ request, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user;

    // verify if current password matches
    const verifyPassword = await Hash.verify(
      request.input("password"),
      user.password
    );

    // display appropriate message
    if (!verifyPassword) {
      return response.status(400).json({
        status: "error",
        message: "Current password could not be verified! Please try again."
      });
    }
    // hash and save new password
    user.password = await Hash.make(request.input("newPassword"));
    await user.save();

    return response.json({
      status: "success",
      message: "Password updated!"
    });
  }
}

module.exports = UserController;

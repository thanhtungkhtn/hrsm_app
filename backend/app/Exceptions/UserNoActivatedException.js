'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

//
const message = "Tài khoản người dùng chưa được kích hoạt.";
const status = 401;
const code = "E_USER_NO_ACTIVATED";


class UserNoActivatedException extends LogicalException {
  constructor() {
    super(message, status, code);
  }

  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle(error, {
    response
  }) {
    return response.status(404).json({
      error: 'User no activated',
      message: this.message,
      code: this.code
    });
  }
}

module.exports = UserNoActivatedException

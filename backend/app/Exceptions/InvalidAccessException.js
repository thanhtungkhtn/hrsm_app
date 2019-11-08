'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

//
const message = "Tài khoản không có quyền truy cập tài nguyên.";
const status = 401;
const code = "E_USER_NO_PERMISSION";


class InvalidAccessException extends LogicalException {

  constructor() {
    super(message, status, code);
  }

  // /**
  //  * Handle this exception by itself
  //  */
  // // handle () {}
  handle(error, {
    response
  }) {
    return response.status(403).json({
      error: 'invalid access to resource',
      message: this.message,
      code: this.code
    });
  }
}

module.exports = InvalidAccessException

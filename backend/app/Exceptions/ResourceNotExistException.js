'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

//
const message = "Tài nguyên không tồn tại.";
const status = 401;
const code = "E_USER_NO_EXIST";


class ResourceNotExistException extends LogicalException {

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
      error: 'The resource did not exist',
      message: this.message,
      code: this.code
    });
  }
}

module.exports = ResourceNotExistException

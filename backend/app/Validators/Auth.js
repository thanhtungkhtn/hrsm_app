'use strict'

class Auth {
  get rules () {
    return {
      // validation rules
      'email': 'required|email',
      'password': 'required'
    }
  }
  get messages(){
    return {
      'required': 'Woah now, {{ field }} is required.',
    }
  }
  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
    //response.status(400).send(validate.errors)
  }
}

module.exports = Auth

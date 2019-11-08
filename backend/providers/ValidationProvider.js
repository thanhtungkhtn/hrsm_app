"use strict";

const { parsePhoneNumber } = require("libphonenumber-js");
const { ServiceProvider } = require("@adonisjs/fold");

class ValidationProvider extends ServiceProvider {
  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = this.app.use("Validator");
    const Database = this.app.use("Database");

    const existsFn = async (data, field, message, args, get) => {
      const value = get(data, field);
      if (!value) {
        return;
      }

      const [table, column] = args;
      const row = await Database.table(table)
        .where(column, value)
        .first();

      if (!row) {
        throw message;
      }
    };

    const phoneFn = async (data, field, message, args, get) => {
      const value = get(data, field);
      if (!value) {
        return;
      }

      const phoneNumber = parsePhoneNumber(value, args[0] || "VN");

      if (!phoneNumber.isValid()) {
        throw message;
      }
    };

    Validator.extend("exists", existsFn);
    Validator.extend("phone", phoneFn);
  }
}

module.exports = ValidationProvider;

"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class AppProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    // DataTables
    this.app.singleton("DataTables", () => {
      const Config = this.app.use("Adonis/Src/Config");

      return new (require("./src/DataTables/DataTables"))(Config);
    });

    // RabbitMQ
    this.app.singleton("RabbitMQ", () => {
      const Config = this.app.use("Adonis/Src/Config");
      const Event = this.app.use("Adonis/Src/Event");

      return new (require("./src/RabbitMQ"))(Config, Event);
    });

    // Messenger
    this.app.singleton("Messenger", () => {
      const Config = this.app.use("Adonis/Src/Config");

      return new (require("./src/Messenger"))(Config);
    });
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    // Inject context to DataTables
    const Context = this.app.use("Adonis/Src/HttpContext");
    const DataGrid = this.app.use("DataTables");

    Context.onReady(ctx => {
      DataGrid.ctx = ctx;
    });
  }
}

module.exports = AppProvider;

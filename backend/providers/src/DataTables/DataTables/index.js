"use strict";

const Builder = require("../Builder");

class DataTables {
  constructor(Config) {
    this.Config = Config;
  }

  /**
   * Build up the data grid
   *
   * @param config
   * @returns {*}
   */
  build(config) {
    return new Builder(this.Config.get("dataTables.defaults"), this.ctx)
      .setQueryFn(config.query)
      .setDefaults(config.defaults)
      .setEditorOptions(config.options);
  }

  /**
   * Return sorted/filtered paginated results
   *
   * @param config
   * @returns {Promise}
   */
  paginate(config) {
    return this.build(config).paginate();
  }

  /**
   * Return sorted/filtered exported results
   *
   * @param config
   * @returns {Promise}
   */
  export(config) {
    return this.build(config).export(config.exportOptions);
  }
}

module.exports = DataTables;

"use strict";

const _ = require("lodash");
const json2csv = require("json2csv");

class Builder {
  constructor(defaults, ctx) {
    this.ctx = ctx;
    this.defaults = {};
    this.searchables = [];
    this.filterables = {};
    this.sortables = {};

    this.setDefaults(defaults);
  }

  /**
   * Query function to use (usually Model.query())
   *
   * @param fn
   * @returns {Builder}
   */
  setQueryFn(fn) {
    if (!_.isFunction(fn)) {
      throw new Error("setQuery accepts a function");
    }

    this.queryFn = fn;
    return this;
  }

  /**
   * Set defaults
   *
   * @param config
   * @returns {Builder}
   */
  setDefaults(config) {
    if (!_.isPlainObject(config)) {
      config = {};
    }

    const initial = {
      draw: 0,
      page: 0,
      perPage: 25,
      perPageLimit: { min: 5, max: 100 },
      search: "",
      filters: {},
      sorts: "",
      queryParams: {
        columns: "columns",
        draw: "draw",
        start: "start",
        length: "length",
        search: "search",
        filter: "filter",
        order: "order"
      }
    };

    this.defaults = Object.assign(initial, this.defaults, config);
    return this;
  }

  /**
   * Set fields that can be globally searched
   *
   * @param columns
   * @returns {Builder}
   */
  setSearchables(columns) {
    const searchables = [];
    _.forEach(columns, column => {
      if (!_.isEmpty(column.data) || !_.isEmpty(column.name)) {
        const name = column.data || column.name;
        if (name.split(".").length === 1 && column.searchable === "true") {
          searchables.push(name);
        }
      }
    });

    this.searchables = searchables;
    return this;
  }

  /**
   * Set filterable fields
   *
   * @param filterables
   * @returns {Builder}
   */
  setFilterables(filterables) {
    if (!_.isPlainObject(filterables)) {
      throw new Error("setFilterable accepts a plain object");
    }

    this.filterables = filterables;
    return this;
  }

  /**
   * Set sortable fields
   *
   * @param columns
   * @returns {Builder}
   */
  setSortables(columns) {
    const sortables = {};
    _.forEach(columns, column => {
      if (!_.isEmpty(column.data) || !_.isEmpty(column.name)) {
        const name = column.data || column.name;
        if (name.split(".").length === 1 && column.orderable === "true") {
          sortables[name] = name;
        }
      }
    });

    this.sortables = sortables;
    return this;
  }

  /**
   * Set draw
   *
   * @param draw
   * @returns {Builder}
   */
  setDraw(draw) {
    draw = parseInt(draw, 10);

    if (Number.isNaN(draw)) {
      draw = this.defaults.draw;
    }

    this.draw = draw;
    return this;
  }

  /**
   * Set requested page
   *
   * @param page
   * @returns {Builder}
   */
  setPage(page) {
    page = parseInt(page, 10);
    if (Number.isNaN(page)) {
      page = this.defaults.page;
    }

    this.page = page;
    return this;
  }

  /**
   * Set requested rows per page
   *
   * @param perPage
   * @returns {Builder}
   */
  setPerPage(perPage) {
    perPage = parseInt(perPage, 10);
    if (Number.isNaN(perPage)) {
      perPage = this.defaults.perPage;
    }

    if (perPage < this.defaults.perPageLimit.min) {
      perPage = this.defaults.perPageLimit.min;
    } else if (perPage > this.defaults.perPageLimit.max) {
      perPage = this.defaults.perPageLimit.max;
    }

    this.perPage = perPage;
    return this;
  }

  /**
   * Set requested search
   *
   * @param search
   * @returns {Builder}
   */
  setSearch(search) {
    search = String(search || "").trim();
    if (!search) {
      search = this.defaults.search;
    }

    this.search = search.replace(/[%_]/g, " ");
    return this;
  }

  /**
   * Set requested filters
   *
   * @param filters
   * @returns {Builder}
   */
  setFilters(filters) {
    if (!_.isPlainObject(filters)) {
      filters = this.defaults.filters;
    }

    for (const [param, filter] of Object.entries(filters)) {
      filters[param] = String(filter || "").trim();
    }

    this.filters = filters;
    return this;
  }

  /**
   * Set requested sorts
   *
   * @param columns
   * @param order
   * @returns {Builder}
   */
  setSorts(columns, order) {
    const sorts = [];
    _.forEach(order, value => {
      if (columns[value.column].orderable === "false") {
        return;
      }

      let orderBy = columns[value.column].data;
      if (_.includes(orderBy, ".")) {
        orderBy = orderBy.substr(0, orderBy.indexOf("."));
      }

      sorts.push((value.dir === "asc" ? "" : "-") + orderBy || "");
    });

    if (sorts.length) {
      this.sorts = sorts.join(",");
    } else {
      this.sorts = this.defaults.sorts;
    }

    return this;
  }

  setEditorOptions(options) {
    this.options = options;

    return this;
  }

  /**
   * Apply search query
   *
   * @param query
   */
  applySearch(query) {
    if (!this.search || _.isEmpty(this.searchables)) {
      return;
    }

    for (const searchable of this.searchables) {
      query.orWhere(searchable, "REGEXP", this.search);
    }
  }

  /**
   * Apply filter queries
   *
   * @param query
   */
  applyFilters(query) {
    if (!this.filters || _.isEmpty(this.filterables)) {
      return;
    }

    query.where(q => {
      for (const [param, filterable] of Object.entries(this.filterables)) {
        if (!this.filters.hasOwnProperty(param)) {
          continue;
        }

        if (_.isFunction(filterable)) {
          filterable.call(this, q, this.filters[param]);
        } else {
          q.where(filterable, this.filters[param]);
        }
      }
    });
  }

  /**
   * Apply sort queries
   *
   * @param query
   */
  applySorts(query) {
    if (!this.sorts || _.isEmpty(this.sortables)) {
      return;
    }

    const sorts = this.sorts.split(",");
    for (const sort of sorts) {
      const desc = sort[0] === "-";
      const param = desc ? sort.substr(1) : sort;

      if (!this.sortables.hasOwnProperty(param)) {
        continue;
      }

      const sortable = this.sortables[param];
      query.orderBy(sortable, desc ? "desc" : "asc");
    }
  }

  /**
   * Build query
   *
   * @returns {*}
   */
  make() {
    const params = this.ctx.request.only(
      Object.values(this.defaults.queryParams)
    );

    this.setFilterables({});
    this.setSearchables(params.columns);
    this.setSortables(params.columns);
    this.setDraw(params.draw);
    this.setPage(params.start);
    this.setPerPage(params.length);
    this.setSearch(params.search ? params.search.value : "");
    this.setFilters(params.filter);
    this.setSorts(params.columns, params.order);

    const query = this.queryFn.call(this);
    this.applySearch(query);
    this.applyFilters(query);
    this.applySorts(query);

    return query;
  }

  /**
   * Return paginated rows
   *
   * @returns {Promise}
   */
  async paginate() {
    try {
      const options = {};
      await Promise.all(
        _.keys(this.options).map(async key => {
          options[key] = await this.options[key]
            .query()
            .fetch()
            .then(results => {
              return results.toJSON().map(this.options[key].format);
            });
        })
      );

      const data = await Promise.all([
        this.make().count(),
        this.make()
          .offset(this.page)
          .limit(this.perPage)
          .fetch()
      ]);

      return {
        draw: this.draw,
        recordsTotal: data[0][0]["count(*)"],
        recordsFiltered: data[0][0]["count(*)"],
        data: data[1].toJSON().map(item => {
          item["DT_RowId"] = `row_${item.id}`;

          return item;
        }),
        options
      };
    } catch (err) {
      console.error(err);
    }

    return {
      draw: 0,
      data: [],
      recordsTotal: 0,
      recordsFiltered: 0
    };
  }

  async export(options) {
    const data = await this.make().fetch();

    return json2csv.parse(
      //
      data.toJSON(),
      {
        fields: options.fields
      }
    );
  }
}

module.exports = Builder;

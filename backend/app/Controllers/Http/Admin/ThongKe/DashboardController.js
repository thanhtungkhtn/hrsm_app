"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

const MakeSalary = use("App/Models/MakeSalary");
const AggregateSalary = use("App/Models/AggregateSalary");
const ExportSalary = use("App/Models/ExportSalary");
const PermisionDetail = use("App/Models/PermisionDetail");
const Permision = use("App/Models/Permision");
const Employee = use("App/Models/Employee");
const Literacy = use("App/Models/Literacy");
const Position = use("App/Models/Position");

const AuthorizationService = use("App/Services/AuthorizationService");

/**
 * Resourceful controller for interacting with dashboards
 */
class DashboardController {
  /**
    1 Tổng số nhân viên
        Số nhân viên trong từng phòng ban
    2 Thống kê nhân viên theo quyền hạn
        Thống kê nhân viên theo từng quyền hạn
    3 Thống kê nhân viên theo trình độ
        Thống kê nhân viên theo từng trình độ
    4 Thống kê nhân viên theo chức vụ
        Thống kê nhân viên theo từng chức vụ

    5 Số nhân viên trong từng phòng ban + phần trăm/tổng
    6 số nhân viên nam + phần trăm
      số nhân viên nữ	+ phần trăm
   */

  async checkActionPermission(permision_id, action_code) {
    // kiểm tra quyền thực hiện

    let result = await PermisionDetail.query()
      .where({ permision_id: permision_id, action_code: action_code })
      .select("check_action")
      .firstOrFail();

    return result.toJSON().check_action;
  }

  async statistical({ request, response, view, auth }) {
    var query = {
      employee: {},
      permision: {},
      literacy: {},
      position: {},
      gender: {}
    };

    // 1
    const sumEmployee = await Employee.getCount();
    const query1 = await Database.raw(
      `
      SELECT name, COUNT(user_id) as soluong
      FROM labour_contracts as l
      join offices as o on l.office_id = o.id
      GROUP BY name
      ORDER BY COUNT(user_id) DESC
      `
    );

    query.employee.sum = sumEmployee;
    query.employee.statistics = [];
    Object.keys(query1[0]).forEach(function(key) {
      let row = query1[0][key];
      let obj = {};
      obj.name = row.name;
      obj.soluong = row.soluong;
      obj["account"] = ((row.soluong / sumEmployee) * 100).toFixed(2);
      query.employee.statistics.push(obj);
    });
    // console.log(query.employee.statistics)

    // 2
    const sumPer = await Permision.getCount();
    const query2 = await Database.raw(
      `
      SELECT name_per, COUNT(user_id) as soluong
      FROM employees as e
      join permisions as p on e.permision_id = p.id
      GROUP BY name_per
      ORDER BY COUNT(user_id) DESC
      `
    );
    query.permision.sum = sumPer;
    query.permision.statistics = [];
    Object.keys(query2[0]).forEach(function(key) {
      let row = query2[0][key];
      let obj = {};
      obj.name_per = row.name_per;
      obj.soluong = row.soluong;

      query.permision.statistics.push(obj);
    });

    // console.log(query)

    // 3
    const sumLiteracy = await Literacy.getCount();
    const query3 = await Database.raw(
      `
      SELECT name, COUNT(user_id) as soluong
      FROM labour_contracts as l
      join literacies as li on l.literacy_id = li.id
      GROUP BY name
      ORDER BY COUNT(user_id) DESC
      `
    );
    query.literacy.sum = sumLiteracy;
    query.literacy.statistics = [];
    Object.keys(query3[0]).forEach(function(key) {
      let row = query3[0][key];
      let obj = {};
      obj.name = row.name;
      obj.soluong = row.soluong;

      query.literacy.statistics.push(obj);
    });

    // 4
    const sumPosition = await Position.getCount();
    const query4 = await Database.raw(
      `
      SELECT name, COUNT(user_id) as soluong
      FROM labour_contracts as l
      join positions as p on l.position_id = p.id
      GROUP BY name
      ORDER BY COUNT(user_id) DESC
      `
    );

    query.position.sum = sumPosition;
    query.position.statistics = [];
    Object.keys(query4[0]).forEach(function(key) {
      let row = query4[0][key];
      let obj = {};
      obj.name = row.name;
      obj.soluong = row.soluong;

      query.position.statistics.push(obj);
    });

    // 6
    const query5 = await Database.raw(
      // gender
      `
      SELECT gender, COUNT(id) as soluong
      FROM employees
      GROUP BY gender
      ORDER BY COUNT(id) DESC
      `
    );

    query.gender.statistics = [];
    Object.keys(query5[0]).forEach(function(key) {
      let row = query5[0][key];
      let obj = {};
      obj.gender = row.gender;
      obj.soluong = row.soluong;
      obj["account"] = ((row.soluong / sumEmployee) * 100).toFixed(2);
      query.gender.statistics.push(obj);
    });

    return response.json({
      status: "success",
      data: query
    });
  }
}

module.exports = DashboardController;

"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('moment')} */
const moment = use("moment");

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use("Database");

const User = use("App/Models/User");
const PermisionDetail = use("App/Models/PermisionDetail");

const Employee = use("App/Models/Employee");
const LabourContract = use("App/Models/LabourContract");
const InsurranceEmployee = use("App/Models/InsurranceEmployee");
const MakeSalary = use("App/Models/MakeSalary");
const AggregateSalary = use("App/Models/AggregateSalary");
const ExportSalary = use("App/Models/ExportSalary");

const Hash = use("Hash");
const Ws = use("Ws");
const multer = use("multer");
const Helpers = use("Helpers");

var { PythonShell } = require("python-shell");
const path = require("path");
const { spawn } = require("child_process");

const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

/**
 * Resourceful controller for interacting with chamcongs
 */
class ChamCongController {
  get timeWork() {
    return moment().format("HH:mm:ss");
  }

  get monthWork() {
    return moment().format("MM");
  }

  get getDate() {
    return moment().format("YYYY-MM-DD");
  }

  /**
   * Show a list of all chamcongs.
   * GET chamcongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {
    try {
      const user = auth.current.user;
      const results = await user.employee().fetch();

      return response.json({
        user: user,
        results: await results.makeSalary().fetch()
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserSalary({ auth, request, response, view }) {
    try {
      const user = auth.current.user;
      const results = await user.employee().fetch();

      return response.json({
        user: user,
        results: await results.exportsalary().fetch()
      });
    } catch (error) {
      console.log(error);
    }
  }

  async checkIn({ auth, response }) {
    try {
      const user = auth.current.user;

      const check_turn = await MakeSalary.query()
        .where({ employee_id: user.id, date: this.getDate })
        .first();

      if (!check_turn) {
        await MakeSalary.create({
          employee_id: user.id,
          date: this.getDate,
          check_in: this.timeWork
        });
      } else {
        throw new Error("Turn join work created !!!");
      }

      return response.json({
        status: "success",
        message: "Turn join work created!"
      });
    } catch (error) {
      return response.status(404).json({
        status: error.message,
        message: "Something problem"
      });
    }
  }

  async checkOut({ response, auth }) {
    try {
      const user = auth.current.user;

      const check_turn = await MakeSalary.query()
        .where({ employee_id: user.id, date: this.getDate })
        .firstOrFail();
      const out = check_turn.toJSON();

      if (!out.check_out) {
        await check_turn.merge({
          check_out: this.timeWork
        });
        await check_turn.save();

        await this.createWorkDate(user.id); // tinh ngay cong dó

        const get_cong = await MakeSalary.query()
          .where({ employee_id: user.id, date: this.getDate })
          .firstOrFail();
        const get_congjson = get_cong.toJSON(); // get work date

        // kiểm tra xem đã tạo tháng công cho nhân viên chưa
        const check_cong = await AggregateSalary.query()
          .where({ employee_id: user.id, months_work: this.monthWork })
          .first();

        // sau khi check out sẽ lập tức tạo một bảng công cho nhân viên
        // sau đó update ngày công
        if (!check_cong) {
          await AggregateSalary.create({
            employee_id: user.id,
            date_work: get_congjson.date_work,
            months_work: this.monthWork
          });
        } else {
          await check_cong.merge({
            date_work: get_congjson.date_work
          });
          await check_cong.save();
        }

        // update lương

        // Số ngày công => tính số ngày nghỉ  - AggregateSalary
        // tổng số ngày công trong một tháng là 24
        const getDayWorkTable = await AggregateSalary.query()
          .where({ employee_id: user.id, months_work: this.monthWork })
          .first();
        const getDayWorkTables = getDayWorkTable.toJSON();

        if (getDayWorkTables) {
          const numberDayOff = 24 - getDayWorkTables.date_work;

          // lương căn bản - position - labour_contract
          const info = await LabourContract.query()
            .where("user_id", auth.current.user.id)
            .with("position")
            .with("literacy")
            .with("salary")
            .firstOrFail();
          const infos = info.toJSON();

          const thuongphatAndphucap = await user
            .employee()
            .with("reward_and_punishment")
            .with("positionAllowance")
            .fetch();
          const thuongphatAndphucaps = thuongphatAndphucap.toJSON();

          // tiền phạt + thưởng - reward_and_punishment
          const moneyOfRP = data => {
            let sum = 0;
            data.reward_and_punishment.map(x => {
              if (x.type === "REWARD") {
                sum = sum + x.money;
              } else if (x.type === "PUNISHMENT") {
                sum = sum - x.money;
              }
            });
            return sum;
          };

          const heSo = data => {
            return (
              data.position.position_coefficient +
              data.position.responsibility_coefficient +
              data.literacy.professional_coefficient +
              data.salary.salary_coefficient
            );
          };

          const check_SalaryTable = await ExportSalary.query()
            .where({ employee_id: user.id, months_salary: this.monthWork })
            .first();
          if (!check_SalaryTable) {
            await ExportSalary.create({
              employee_id: user.id,
              aggregate_salary_id: getDayWorkTables.id,
              position_allowance:
                thuongphatAndphucaps.positionAllowance[0].money,
              insurrance_employee: 0.15 * infos.position.basic_salary,
              TienThuongPhat: moneyOfRP(thuongphatAndphucaps),
              months_salary: this.monthWork,
              TongLuong:
                infos.position.basic_salary +
                (infos.position.basic_salary * heSo(infos)) / 100 +
                (numberDayOff + infos.position.basic_salary) / 24 +
                moneyOfRP(thuongphatAndphucaps) -
                0.15 * infos.position.basic_salary +
                thuongphatAndphucaps.positionAllowance[0].money
            });
          } else {
            // this.update
            await check_SalaryTable.merge({
              TongLuong:
                infos.position.basic_salary +
                (infos.position.basic_salary * heSo(infos)) / 100 +
                (numberDayOff + infos.position.basic_salary) / 24 +
                moneyOfRP(thuongphatAndphucaps) -
                0.15 * infos.position.basic_salary +
                thuongphatAndphucaps.positionAllowance[0].money
            });
            await check_SalaryTable.save();
          }
        }
      } else {
        // throw invalid
        throw new Error("Turn left work created and checked out!!!");
      }

      return response.json({
        status: "success",
        message: "Turn left work created!"
      });
    } catch (error) {
      return response.status(404).json({
        status: error.message,
        message: "Something problem"
      });
    }
  }

  async createWorkDate(employee_id) {
    try {
      const get_check = await MakeSalary.query()
        .where({ employee_id: employee_id, date: this.getDate })
        .firstOrFail();

      // sau khi check_out se cong them so gio và so ngay
      const check_invalid = get_check.toJSON(),
        beforeTimeAM = moment("07:00:00", "hh:mm:ss"),
        afterTimeAM = moment("11:00:00", "hh:mm:ss"),
        beforeTimePM = moment("13:00:00", "hh:mm:ss"),
        afterTimePM = moment("17:00:00", "hh:mm:ss");

      if (
        moment(check_invalid.check_in, "hh:mm:ss").isBetween(
          beforeTimeAM,
          afterTimeAM
        ) &&
        moment(check_invalid.check_out, "hh:mm:ss").isBetween(
          beforeTimeAM,
          afterTimeAM
        )
      ) {
        const Sum =
          moment(check_invalid.check_out, "hh:mm:ss").get("hour") -
          moment(check_invalid.check_in, "hh:mm:ss").get("hour");

        if (Sum >= 2.5) {
          await get_check.merge({
            date_work: 0.5
          });
          await get_check.save();
        } else if (Sum >= 6.5) {
          await get_check.merge({
            date_work: 1
          });
          await get_check.save();
        } else {
          await get_check.merge({
            date_work: 0.0
          });
          await get_check.save();
        }
      } else if (
        moment(check_invalid.check_in, "hh:mm:ss").isBetween(
          beforeTimeAM,
          afterTimeAM
        ) &&
        moment(check_invalid.check_out, "hh:mm:ss").isBetween(
          beforeTimePM,
          afterTimePM
        )
      ) {
        const addTwoHour = moment(check_invalid.check_in, "hh:mm:ss").add(
          2,
          "hour"
        );
        // console.log(addTwoHour)
        const Sum =
          moment(check_invalid.check_out, "hh:mm:ss").get("hour") -
          moment(addTwoHour, "hh:mm:ss").get("hour");
        // console.log(Sum)
        if (Sum >= 2.5) {
          await get_check.merge({
            date_work: 0.5
          });
          await get_check.save();
        } else if (Sum >= 6.5) {
          await get_check.merge({
            date_work: 1
          });
          await get_check.save();
        } else {
          // invalid
          await get_check.merge({
            date_work: 0.0
          });
          await get_check.save();
        }
      } else if (
        moment(check_invalid.check_in, "hh:mm:ss").isBetween(
          beforeTimePM,
          afterTimePM
        ) &&
        moment(check_invalid.check_out, "hh:mm:ss").isBetween(
          beforeTimePM,
          afterTimePM
        )
      ) {
        const Sum =
          moment(check_invalid.check_out, "hh:mm:ss").get("hour") -
          moment(check_invalid.check_in, "hh:mm:ss").get("hour");
        if (Sum >= 2.5) {
          await get_check.merge({
            date_work: 0.5
          });
          await get_check.save();
        } else if (Sum >= 6.5) {
          await get_check.merge({
            date_work: 1
          });
          await get_check.save();
        } else {
          // invalid
          await get_check.merge({
            date_work: 0.0
          });
          await get_check.save();
        }
      } else {
        const Sum =
          moment(check_invalid.check_out, "hh:mm:ss").get("hour") -
          moment(check_invalid.check_in, "hh:mm:ss").get("hour");
        if (Sum >= 2.5 && Sum < 6.5) {
          await get_check.merge({
            date_work: 0.5
          });
          await get_check.save();
        } else if (Sum >= 6.5 && Sum >= 6.5) {
          await get_check.merge({
            date_work: 1
          });
          await get_check.save();
        } else {
          // invalid
          await get_check.merge({
            date_work: 0.0
          });
          await get_check.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async upload({ auth, request, response, view }) {
    try {
      const profilePic = request.file("image");
      var name = profilePic.clientName;
      var ext = name.split(".")[1];
      var ts = new Date().valueOf();
      var fileName = ts + "." + ext;

      await profilePic.move(Helpers.publicPath("../uploads"), {
        name: fileName
      });

      const user = auth.current.user;
      const results = await user.employee().fetch();

      function runScript() {
        return spawn("python", [
          "-u",
          path.join(__dirname, "../../../../pythonside/Compare.py"),
          fileName,
          results.avatar
        ]);
      }
      const subprocess = runScript();

      subprocess.stdout.on("data", data => {
        if (data == 0) {
          this.checkIn({ auth, response });
        }
      });

      subprocess.stderr.on("data", data => {
        console.log(`error:${data}`); // co loi
      });

      subprocess.stderr.on("close", data => {
        console.log("Closed");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async uploadout({ auth, request, response, view }) {
    try {
      const profilePicOut = request.file("imageOut");
      // console.log(profilePicOut);
      var name = profilePicOut.clientName;
      var ext = name.split(".")[1];
      var ts = new Date().valueOf();
      var fileName = ts + "." + ext;

      await profilePicOut.move(Helpers.publicPath("../uploads"), {
        name: fileName
      });

      const user = auth.current.user;
      const results = await user.employee().fetch();

      function runScript() {
        return spawn("python", [
          "-u",
          path.join(__dirname, "../../../../pythonside/Compare.py"),
          fileName,
          results.avatar
        ]);
      }
      const subprocess = runScript();

      // print output of script
      subprocess.stdout.on("data", data => {
        if (data == 0) {
          console.log("the same image");
          this.checkOut({ auth, response });
        }
      });
      subprocess.stderr.on("data", data => {
        console.log(`error:${data}`); // co loi
      });

      subprocess.stderr.on("close", () => {
        console.log("Closed");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChamCongController;

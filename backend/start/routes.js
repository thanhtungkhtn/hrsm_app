"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const Helpers = use("Helpers");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";

    return cb(error, false);
  }
  cb(null, true);
};

// const upload = multer({
//   dest: '../upload',
//   fileFilter,
//   limits: {
//       fileSize: 500000
//   }
// });

Route.get("/adonis-ws", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  // user signup
  // Route.post('/auth/signup', 'AuthController.signup').validator('Register');

  // user login
  Route.post("/auth/login", "Auth/AuthController.login").validator("Auth");

  Route.get("/getuser/:id", "Auth/AuthController.show");
}).prefix("/api");

// user account
Route.group(() => {
  Route.get("/account", "User/UserController.me");
  Route.patch("/account", "User/UserController.updateProfile");
  Route.put("/change_password", "UserController.changePassword");

  Route.get("/account/per", "User/PermissionController.index");

  Route.get("/account/relative", "User/ThanNhanController.index");
  Route.post("/account/relative", "User/ThanNhanController.store");
  Route.delete("/account/relative/:id", "User/ThanNhanController.destroy");
  Route.patch("/account/relative/:id", "User/ThanNhanController.update");

  Route.get("/account/labourcontract", "User/HopDongController.index");

  Route.get("/account/literacy", "User/TrinhDoController.index");

  Route.get("/account/timekeeping", "User/ChamCongController.index"); // get cong
  Route.get("/account/getusersa", "User/ChamCongController.getUserSalary"); // get luong
  Route.post("/account/turnworkin", "User/ChamCongController.checkIn");
  Route.post("/account/turnworkout", "User/ChamCongController.checkOut");

  Route.post("/account/upload", "User/ChamCongController.upload");
  Route.post("/account/uploadout", "User/ChamCongController.uploadout");

  // Route.post('/account/upload', async ({ request }) => {
  //   const profilePic = request.file('image')

  //   console.log(profilePic)
  //   var name = profilePic.clientName
  //   var ext = name.split('.')[1]
  //   var ts = new Date().valueOf()
  //   var fileName = ts + '.' + ext

  //   await profilePic.move(Helpers.publicPath('../uploads'), {
  //       name: fileName
  //   })
  // })
})
  .prefix("api")
  .middleware(["auth:jwt"]);

// function for admin user
Route.group(() => {
  // Employee
  Route.patch("employee/:id", "Admin/NhanSu/EmployeeController.update"); //.validator('Contact')
  Route.delete("employee/:id", "Admin/NhanSu/EmployeeController.destroy");
  Route.post("employee", "Admin/NhanSu/EmployeeController.store"); //.validator('Contact')
  Route.get("employees", "Admin/NhanSu/EmployeeController.index");

  // Position
  Route.get("positions", "Admin/NhanSu/ChucVuController.index");
  Route.post("position", "Admin/NhanSu/ChucVuController.store");
  Route.patch("position/:id", "Admin/NhanSu/ChucVuController.update");
  Route.delete("position/:id", "Admin/NhanSu/ChucVuController.destroy");

  Route.get("lcontracts", "Admin/NhanSu/HopDongController.index");
  Route.post("labourcontract", "Admin/NhanSu/HopDongController.store");
  Route.patch("labourcontract/:id", "Admin/NhanSu/HopDongController.update");
  Route.delete("labourcontract/:id", "Admin/NhanSu/HopDongController.destroy");

  // Relative
  Route.get("relatives", "Admin/NhanSu/ThanNhanController.index");
  Route.delete("relatives/:id", "Admin/NhanSu/ThanNhanController.destroy");

  // Office
  Route.get("offices", "Admin/NhanSu/PhongBanController.index");
  Route.post("office", "Admin/NhanSu/PhongBanController.store");
  Route.patch("office/:id", "Admin/NhanSu/PhongBanController.update");
  Route.delete("office/:id", "Admin/NhanSu/PhongBanController.destroy");

  // Literacy
  Route.get("literacies", "Admin/NhanSu/TrinhDoController.index");
  Route.post("literacy", "Admin/NhanSu/TrinhDoController.store");
  Route.patch("literacy/:id", "Admin/NhanSu/TrinhDoController.update");
  Route.delete("literacy/:id", "Admin/NhanSu/TrinhDoController.destroy");

  // Insurrances
  Route.get("insurrances", "Admin/CheDo/BaoHiemController.index"); //.validator('Contact')
  Route.post("insurrance", "Admin/CheDo/BaoHiemController.store");
  Route.patch("insurrance/:id", "Admin/CheDo/BaoHiemController.update");
  Route.delete("insurrance/:id", "Admin/CheDo/BaoHiemController.destroy");

  // Insurrances Employee
  Route.get("inems", "Admin/CheDo/InsurranceEmployeeController.index"); //.validator('Contact')
  Route.post("inem", "Admin/CheDo/InsurranceEmployeeController.store");
  Route.patch("inem/:id", "Admin/CheDo/InsurranceEmployeeController.update");
  Route.delete("inem/:id", "Admin/CheDo/InsurranceEmployeeController.destroy");

  // Reward And Punishment
  Route.get("raps", "Admin/CheDo/KhenThuongKyLuatController.index"); //.validator('Contact')
  Route.post("rap", "Admin/CheDo/KhenThuongKyLuatController.store");
  Route.patch("rap/:id", "Admin/CheDo/KhenThuongKyLuatController.update");
  Route.delete("rap/:id", "Admin/CheDo/KhenThuongKyLuatController.destroy");

  // Permission
  Route.get("permissions", "Admin/Permission/PermissionController.index"); //.validator('Contact')
  Route.post("permission", "Admin/Permission/PermissionController.store");
  Route.patch("permission/:id", "Admin/Permission/PermissionController.update");
  Route.delete(
    "permission/:id",
    "Admin/Permission/PermissionController.destroy"
  );

  // Permission Detail
  Route.get("perdets", "Admin/Permission/PermissionDetailController.index"); //.validator('Contact')
  Route.post("perdet", "Admin/Permission/PermissionDetailController.store");
  Route.patch(
    "perdet/:id",
    "Admin/Permission/PermissionDetailController.update"
  );
  Route.delete(
    "perdet/:id",
    "Admin/Permission/PermissionDetailController.destroy"
  );

  // statistical
  Route.get("statistical", "Admin/ThongKe/DashboardController.statistical");

  // Salary
  Route.get("/cg", "Admin/CongLuong/CongLuongController.cong"); // get cong
  Route.get("/bcg", "Admin/CongLuong/CongLuongController.bangcong"); // get cong
  Route.get("/blg", "Admin/CongLuong/CongLuongController.bangluong"); // get cong
  Route.patch("cg/:id", "Admin/CongLuong/CongLuongController.updateCong"); // edit bang cham cong
  Route.patch("bcg/:id", "Admin/CongLuong/CongLuongController.updateBangCong"); // edit bang cham cong
  Route.patch("blg/:id", "Admin/CongLuong/CongLuongController.updateBangLuong"); // edit bang cham cong

  // python
  Route.post("py", "Admin/Python/PythonController.callName");
})
  .prefix("api")
  .middleware("auth");

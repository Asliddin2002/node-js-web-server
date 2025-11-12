import type { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/EmployeeController");

router
  .route("/")
  .get(controllers.employeesGet)
  .post(controllers.employeeCreate)
  .put(controllers.employeeUpdate)
  .delete(controllers.employeeUpdate);

module.exports = router;

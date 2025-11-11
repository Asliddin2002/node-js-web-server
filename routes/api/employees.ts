import type { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/EmployeeController");

router
  .route("/")
  .get(controllers.employeesGet)
  .post(controllers.employeeCreate)
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

module.exports = router;

import type { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const controllers = require("../controllers/EmployeeController");

router
  .route("/employees")
  .get(controllers.employeesGet)
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

module.exports = router;

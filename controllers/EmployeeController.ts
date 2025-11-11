import type { Request, Response } from "express";
import { Employees } from "../types/type";

const employeesDB = {
  employees: require("../data/employees.json"),
  setEmployees: function (data: Employees) {
    this.employees = data;
  },
};

function employeesGet(req: Request, res: Response) {
  res.status(200).json(employeesDB.employees);
}

module.exports = {
  employeesGet,
};

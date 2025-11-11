import type { Request, Response } from "express";
import { Employees } from "../types/type";

const employeesDB = {
  employees: require("../data/employees.json"),
  setEmployees: function (data: Employees[]) {
    this.employees = data;
  },
};

function employeesGet(req: Request, res: Response) {
  res.json(employeesDB.employees);
}

function employeeCreate(req: Request, res: Response) {
  if (!req.body.fullName || !req.body.age) {
    res.status(409).json("All fields are required");
  } else {
    const newEmployee: Employees = {
      id: employeesDB.employees.length
        ? employeesDB.employees[employeesDB.employees.length - 1].id + 1
        : 1,
      fullName: req.body.fullName,
      age: req.body.age,
    };

    employeesDB.setEmployees([...employeesDB.employees, newEmployee]);
    res.status(201).json(employeesDB.employees);
  }
}

module.exports = {
  employeesGet,
  employeeCreate,
};

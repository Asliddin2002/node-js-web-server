import type { Request, Response } from "express";
import { Employees } from "../types/type";
import { EmployeeDB } from "./type";

const employeesDB: EmployeeDB = {
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

function employeeUpdate(req: Request, res: Response) {
  if (req.body.id) {
    const employee = employeesDB.employees.find((em) => em.id === req.body.id);
    if (!employee) {
      res.status(404).json("Employee not found!");
    } else {
      const payload: Employees = {
        ...employee,
      };
      if (req.body.fullName) {
        payload.fullName = req.body.fullName;
      }
      if (req.body.age) {
        payload.age = req.body.age;
      }
      const sortData = employeesDB.employees
        .map((em) => {
          if (em.id == req.body.id) {
            return payload;
          }
          return em;
        })
        .sort((a, b) => a.id - b.id);

      employeesDB.setEmployees(sortData);
      res.status(200).json(payload);
    }
  } else {
    res.status(409).json("Id is required");
  }
}

function employeeDelete(req: Request, res: Response) {
  if (!req.body.id) {
    res.status(409).json("Id is required");
  } else {
    const filteredData = employeesDB.employees.filter(
      (em) => em.id !== req.body.id
    );

    employeesDB.setEmployees(filteredData);
    res.status(204).json(filteredData);
  }
}

module.exports = {
  employeesGet,
  employeeCreate,
  employeeUpdate,
  employeeDelete,
};

import { Employees } from "../types/type";

export interface EmployeeDB {
  employees: Employees[];
  setEmployees: (data: Employees[]) => void;
}

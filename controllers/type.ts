import { Employees, User } from "../types/type";

export interface EmployeeDB {
  employees: Employees[];
  setEmployees: (data: Employees[]) => void;
}

export interface UserDB {
  users: User[];
  setUsers: (data: User[]) => void;
}

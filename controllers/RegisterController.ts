import type { Response, Request } from "express";
import { User } from "../types/type";
import { UserDB } from "./type";

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const usersDb: UserDB = {
  users: require("../data/users.json"),
  setUsers: function (users: User[]) {
    this.users = users;
  },
};

async function registerController(req: Request, res: Response) {
  const { userName, password } = req.body;

  if (!userName || !password)
    res.status(400).json({ message: "Username and Password is required" });

  const duplicate = usersDb.users.find((user) => user.userName === userName);

  if (duplicate)
    res.status(400).json({ message: `Username ${userName} was already taken` });

  try {
    const hashedPwr = await bcrypt.hash(password, 10);

    const newUser = {
      userName,
      password: hashedPwr,
    };

    usersDb.setUsers([...usersDb.users, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDb.users)
    );

    res.status(201).json({ message: `New user ${userName} is created!` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = registerController;

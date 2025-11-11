import type { Request, Response, NextFunction } from "express";
const logTracker = require("../src/logTrack");

module.exports = function logEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = `${req.method}\t${req.headers.origin}`;
  logTracker(message, "app-log.txt");
  next();
};

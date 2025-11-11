import type { Response, Request, NextFunction } from "express";
const path = require("path");

function notFoundPage(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "frontend", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
}

module.exports = notFoundPage;

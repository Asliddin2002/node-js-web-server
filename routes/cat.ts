import type { Response, Request } from "express";

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, "..", "frontend", "cat.html"));
});

module.exports = router;

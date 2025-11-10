import type { Request, Response, NextFunction } from "express";
const express = require("express");
const path = require("path");
const logTracker = require("./logTrack");

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3500;

const allowedOrigins = ["https://www.google.com"];

const corsOptions = {
  origin: (origin: string, callback: (arg: any, arg2?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `${req.method}\t${req.headers.origin}`;
  logTracker(message, "app-log.txt");
  next();
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/cat", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, "..", "frontend", "cat.html"));
});

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, "..", "frontend", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

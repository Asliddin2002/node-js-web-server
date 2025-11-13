import path from "path";
const express = require("express");
const notFoundPage = require("../routes/not-found");
const logEvent = require("../middleware/logEvent");
const corsOptions = require("../config/corsOptions");

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3500;

app.use(logEvent);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/", require("../routes/home"));

app.use("/cat", require("../routes/cat"));

app.use("/register", require("../routes/register"));

// apis
app.use("/employees", require("../routes/api/employees"));

app.use(require("../routes/not-found"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promise;

function logTracker(message: string, fileName: string): void {
  const logDir = path.join(__dirname, "..", "app_log");
  const filePath = path.join(logDir, fileName);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}]\t ${message}\n`;

  fs.appendFileSync(filePath, logMessage, "utf8");
}

module.exports = logTracker;

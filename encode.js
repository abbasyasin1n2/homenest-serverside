const fs = require("fs");
const key = fs.readFileSync("./homenest-clientside-firebase-adminsdk-fbsvc-7a462d44f7.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);


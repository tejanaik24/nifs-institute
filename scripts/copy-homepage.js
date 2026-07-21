const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "out", "homepage.html");
const dest = path.join(__dirname, "..", "out", "index.html");

fs.copyFileSync(src, dest);
console.log("Copied out/homepage.html -> out/index.html");

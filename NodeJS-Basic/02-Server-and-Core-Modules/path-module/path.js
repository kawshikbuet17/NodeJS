//path module

//import path from path module
//this is a builtin module
//no npm install needed
const path = require('path');

//giving this file path
const myPath = "D:/Coding/NodeJS/NodeJS-Basic/02-Server-and-Core-Modules/path-module/path.js";

console.log(path.basename(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));
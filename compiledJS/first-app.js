"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
fs.writeFileSync("hello.txt", "Hello World");
console.log('written to file : Hello World');

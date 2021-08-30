"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer = (sec) => new Promise(res => setTimeout(res, sec));
exports.default = timer;

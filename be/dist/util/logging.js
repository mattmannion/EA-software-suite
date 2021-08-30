"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time_stamp = exports.timer = void 0;
const timer = (sec) => new Promise(res => setTimeout(res, sec));
exports.timer = timer;
const time_stamp = () => {
    const date = new Date();
    console.log(`task started at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
};
exports.time_stamp = time_stamp;
const logger = (req) => {
    const date = new Date();
    console.log(`${req.path} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
};
exports.default = logger;

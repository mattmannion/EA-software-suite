"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../env");
const CORS_Error = 'Not Allowed By CORS';
exports.default = (0, cors_1.default)({
    optionsSuccessStatus: 200,
    origin: (origin, cb) => {
        if (env_1.whitelist.has(origin))
            cb(null, true);
        else
            cb(CORS_Error);
    },
    credentials: true,
});

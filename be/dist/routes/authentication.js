"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_login_js_1 = __importDefault(require("../controllers/authentication/check_login.js"));
const login_js_1 = __importDefault(require("../controllers/authentication/login.js"));
const authentication = (0, express_1.Router)();
authentication.route('/login').post(login_js_1.default).get(check_login_js_1.default);
exports.default = authentication;

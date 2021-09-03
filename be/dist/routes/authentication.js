"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_js_1 = __importDefault(require("../controllers/authentication/login.js"));
const login_info_js_1 = __importDefault(require("../controllers/authentication/login_info.js"));
const logout_js_1 = __importDefault(require("../controllers/authentication/logout.js"));
const authentication = (0, express_1.Router)();
authentication.route('/login').post(login_js_1.default).get(login_info_js_1.default);
authentication.route('/logout').delete(logout_js_1.default);
exports.default = authentication;

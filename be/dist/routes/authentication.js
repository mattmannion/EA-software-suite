"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/authentication/login"));
const login_info_1 = __importDefault(require("../controllers/authentication/login_info"));
const logout_1 = __importDefault(require("../controllers/authentication/logout"));
const authentication = (0, express_1.Router)();
authentication.route('/login').post(login_1.default).get(login_info_1.default);
authentication.route('/logout').delete(logout_1.default);
exports.default = authentication;

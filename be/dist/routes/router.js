"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kaffeine_1 = __importDefault(require("./kaffeine"));
const authentication_1 = __importDefault(require("./authentication"));
const orders_1 = __importDefault(require("./orders"));
const users_1 = __importDefault(require("./users"));
exports.default = [kaffeine_1.default, authentication_1.default, orders_1.default, users_1.default];

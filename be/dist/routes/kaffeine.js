"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kaffeine_js_1 = __importDefault(require("../controllers/kaffeine/kaffeine.js"));
const router = new express_1.Router();
router.route('/').get(kaffeine_js_1.default);
exports.default = router;

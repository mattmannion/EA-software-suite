"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_all_js_1 = __importDefault(require("../controllers/users/get_all.js"));
const create_one_js_1 = __importDefault(require("../controllers/users/create_one.js"));
const get_one_js_1 = __importDefault(require("../controllers/users/get_one.js"));
const update_one_js_1 = __importDefault(require("../controllers/users/update_one.js"));
const delete_one_js_1 = __importDefault(require("../controllers/users/delete_one.js"));
const router = new express_1.Router();
router.route('/users').get(get_all_js_1.default).post(create_one_js_1.default);
router.route('/users/:id').get(get_one_js_1.default).put(update_one_js_1.default).delete(delete_one_js_1.default);
exports.default = router;

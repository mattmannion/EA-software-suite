"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = __importDefault(require("../util/logging"));
const kaffiene = (0, express_1.Router)();
kaffiene.route('/').get((req, res) => {
    (0, logging_1.default)(req);
    try {
        res.status(200).send({
            status: 'app woken up',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = kaffiene;

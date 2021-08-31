"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_orders_queries_js_1 = require("../../../sql/orders/get/get_orders_queries.js");
const db_1 = __importDefault(require("../../../util/db"));
const logging_1 = __importDefault(require("../../../util/logging"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_1.default)(req);
    try {
        const data = yield db_1.default
            .query(get_orders_queries_js_1.get_shipped_orders_query)
            .then(res => res.rows)
            .catch(err => console.log(err.stack));
        res.status(200).send({
            data,
            status: 'success',
        });
    }
    catch (error) {
        console.log(error);
    }
});

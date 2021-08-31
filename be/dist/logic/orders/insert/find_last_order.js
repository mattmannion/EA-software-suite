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
const db_1 = __importDefault(require("../../../util/db"));
const insert_order_queries_1 = require("../../../sql/orders/insert/insert_order_queries");
function find_last_order(last_order_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { order_id } = yield db_1.default
                .query(insert_order_queries_1.find_last_order_query)
                .then(res => {
                return res.rows[0];
            })
                .catch(err => console.log(err.stack));
            return (last_order_id = +order_id + 1);
        }
        catch (error) {
            console.log(error);
            return last_order_id++;
        }
    });
}
exports.default = find_last_order;

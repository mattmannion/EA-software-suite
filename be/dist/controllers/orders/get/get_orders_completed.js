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
const db_js_1 = __importDefault(require("../../../util/db.js"));
const logging_js_1 = __importDefault(require("../../../util/logging.js"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_js_1.default)(req);
    try {
        const data = yield db_js_1.default
            .query(`
        select * from orders
          where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
          and
          completed != ''
          and 
          order_status != 'Shipped'
          and
          order_status != 'Cancelled' 
          and 
          order_status != 'Returned'
          order by order_id, order_detail_id;
      `)
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

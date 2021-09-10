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
const logging_1 = __importDefault(require("../../../util/logging"));
const volusion_fetch_1 = __importDefault(require("../../../logic/general/volusion_fetch"));
const update_queries_1 = require("../../../sql/orders/update/update_queries");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_1.default)(req);
    try {
        const { id, o_id, od_id } = req.params;
        let vol_data = yield (0, volusion_fetch_1.default)(o_id);
        return;
        let { OrderID, OrderStatus, OrderDetails } = vol_data[0];
        let fr = yield OrderDetails.map((od) => {
            let order_id = OrderID !== undefined ? OrderID[0] : '';
            let order_detail_id = od.OrderDetailID !== undefined ? od.OrderDetailID[0] : '';
            let product_name = od.ProductName !== undefined ? od.ProductName[0] : '';
            let product_code = od.ProductCode !== undefined ? od.ProductCode[0] : '';
            let order_status = OrderStatus !== undefined ? OrderStatus[0] : '';
            let order_option = od.Options !== undefined ? od.Options[0] : '';
            let order_option_id = od.OptionIDs !== undefined ? od.OptionIDs[0] : '';
            return {
                order_id,
                order_detail_id,
                product_name,
                product_code,
                order_status,
                order_option,
                order_option_id,
            };
        }).filter(({ order_id, order_detail_id }) => o_id === order_id && od_id === order_detail_id)[0];
        let { order_id, order_detail_id, product_name, product_code, order_status, order_option, order_option_id, } = fr;
        const data = yield db_1.default
            .query(update_queries_1.update_item_query, [
            id,
            order_id,
            order_detail_id,
            product_name,
            product_code,
            order_status,
            order_option,
            order_option_id,
        ])
            .then((res) => res.rows[0])
            .catch((err) => console.log(err.stack));
        if (vol_data) {
            res.status(201).json({
                data,
                status: 'success',
            });
        }
        else {
            res.status(400).json({
                status: 'failure',
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});

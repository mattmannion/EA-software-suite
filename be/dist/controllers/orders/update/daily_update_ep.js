"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const select_orders_1 = require("../../../sql/general/select_orders");
const logging_1 = __importStar(require("../../../util/logging"));
const volusion_fetch_1 = __importDefault(require("../../../logic/general/volusion_fetch"));
const update_queries_1 = require("../../../sql/orders/update/update_queries");
let db_tuple = [];
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_1.default)(req);
    try {
        const db_query = yield db_1.default
            .query(select_orders_1.select_filtered_orders)
            .then(res => res.rows)
            .catch(err => console.log(err.stack));
        if (Array.isArray(db_query))
            db_tuple = db_query.map(({ id, order_id, order_detail_id, }) => {
                return {
                    id,
                    order_id,
                    order_detail_id,
                };
            });
        else {
            res.status(500).json({
                status: 'db failure',
            });
            return;
        }
        const MainLoop = (query_element) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, order_id, order_detail_id } = query_element;
                const data = yield (0, volusion_fetch_1.default)(id);
                const { OrderStatus, OrderDetails } = data[0];
                const vol_data = OrderDetails.map((od) => {
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
                }).filter(f => f.order_id === order_id && f.order_detail_id === order_detail_id)[0];
                const { product_name, product_code, order_option, order_status } = vol_data;
                db_1.default.query(update_queries_1.update_orders_query, [
                    id,
                    order_id,
                    order_detail_id,
                    product_name,
                    product_code,
                    order_option,
                    order_status,
                ])
                    .then(res => res.rows)
                    .catch(err => console.log(err.stack));
            }
            catch (err) {
                err;
            }
        });
        res.status(200).json({
            status: 'db updated started',
        });
        for (let i = 0; i < db_tuple.length; i++) {
            yield (0, logging_1.timer)(1000);
            console.log(i + 1, db_tuple[i]);
            MainLoop(db_tuple[i]);
            if (i === db_tuple.length - 1)
                console.log('product info update complete');
        }
        return;
    }
    catch (error) {
        return console.log(error);
    }
});

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
const db_js_1 = __importDefault(require("../../util/db.js"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = __importDefault(require("xml2js"));
const timer_js_1 = __importDefault(require("../../util/timer.js"));
const select_orders_js_1 = require("../../../sql/general/select_orders.js");
const update_queries_js_1 = require("../../../sql/orders/update/update_queries.js");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, timer_js_1.default)();
    try {
        const db_query = yield db_js_1.default
            .query(select_orders_js_1.select_filtered_orders)
            .then(res => res.rows)
            .catch(err => console.log(err.stack));
        const db_tuple = db_query.map(({ id, order_id, order_detail_id }) => {
            return {
                id,
                order_id,
                order_detail_id,
            };
        });
        const MainLoop = (query_array) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, order_id, order_detail_id } = query_array;
                const vol_query = yield (0, node_fetch_1.default)(`${process.env.insert_order_v2}${order_id}`);
                const { xmldata } = yield xml2js_1.default.parseStringPromise(yield vol_query.text(), (err, res) => {
                    if (err)
                        return console.log(err);
                    else
                        return res;
                });
                const { OrderStatus, OrderDetails } = xmldata.Orders[0];
                const vol_data = OrderDetails.map(od => {
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
                }).filter(filter => filter.order_id === order_id &&
                    filter.order_detail_id === order_detail_id)[0];
                const { product_name, product_code, order_option, order_status } = vol_data;
                db_js_1.default.query(update_queries_js_1.update_orders_query, [
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
        for (let i = 0; i < db_tuple.length; i++) {
            yield (0, timer_js_1.default)(2000);
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
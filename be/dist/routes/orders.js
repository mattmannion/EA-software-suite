"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_orders_js_1 = __importDefault(require("../controllers/orders/get/get_orders.js"));
const get_orders_production_js_1 = __importDefault(require("../controllers/orders/get/get_orders_production.js"));
const get_orders_completed_js_1 = __importDefault(require("../controllers/orders/get/get_orders_completed.js"));
const get_orders_shipped_js_1 = __importDefault(require("../controllers/orders/get/get_orders_shipped.js"));
const insert_orders_js_1 = __importDefault(require("../controllers/orders/insert/insert_orders.js"));
const update_item_js_1 = __importDefault(require("../controllers/orders/update/update_item.js"));
const daily_update_ep_js_1 = __importDefault(require("../controllers/orders/update/daily_update_ep.js"));
const notes_js_1 = __importDefault(require("../controllers/orders/update/notes.js"));
const pallet_js_1 = __importDefault(require("../controllers/orders/update/process/pallet.js"));
const tack_js_1 = __importDefault(require("../controllers/orders/update/process/tack.js"));
const assembled_js_1 = __importDefault(require("../controllers/orders/update/process/assembled.js"));
const completed_js_1 = __importDefault(require("../controllers/orders/update/process/completed.js"));
const insert_new_db_js_1 = __importDefault(require("../controllers/orders/insert/insert_new_db.js"));
const delete_order_row_1 = __importDefault(require("../controllers/orders/delete/delete_order_row"));
const insert_order_by_id_1 = __importDefault(require("../controllers/orders/insert/insert_order_by_id"));
const orders = (0, express_1.Router)();
orders.route('/orders/production').get(get_orders_production_js_1.default);
orders.route('/orders/production/completed').get(get_orders_completed_js_1.default);
orders.route('/orders/production/shipped').get(get_orders_shipped_js_1.default);
orders.route('/orders/new_db').get(insert_new_db_js_1.default);
orders.route('/orders/insert_order/:id').post(insert_order_by_id_1.default);
orders.route('/orders/insert_orders').get(insert_orders_js_1.default);
orders.route('/orders/update').put(daily_update_ep_js_1.default);
orders.route('/orders/update/:id&:o_id&:od_id').put(update_item_js_1.default);
orders.route('/orders/update/notes/:id').put(notes_js_1.default);
orders.route('/orders/update/process/pallet/:id&:o_id&:od_id').put(pallet_js_1.default);
orders.route('/orders/update/process/tack/:id&:o_id&:od_id').put(tack_js_1.default);
orders
    .route('/orders/update/process/assembled/:id&:o_id&:od_id')
    .put(assembled_js_1.default);
orders
    .route('/orders/update/process/completed/:id&:o_id&:od_id')
    .put(completed_js_1.default);
orders.route('/orders/delete/:id').delete(delete_order_row_1.default);
orders.route('/orders').get(get_orders_js_1.default);
exports.default = orders;

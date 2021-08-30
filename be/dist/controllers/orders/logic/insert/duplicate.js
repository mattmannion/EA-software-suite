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
const insert_new_db_query_js_1 = __importDefault(require("./queries/insert_new_db_query.js"));
const db_js_1 = __importDefault(require("../../../../util/db.js"));
const timer_js_1 = __importDefault(require("../../../../util/timer.js"));
function dupliate(data_filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query_array = [];
            const dupliate_items = (data, array) => __awaiter(this, void 0, void 0, function* () {
                if (data)
                    data.forEach(data => {
                        let num_of_items = parseInt(data.product_qt);
                        for (let i = 0; i < num_of_items; i++) {
                            array.push(data);
                        }
                    });
                else
                    return;
            });
            yield dupliate_items(data_filter, query_array);
            for (let i = 0; i < query_array.length; i++) {
                yield db_js_1.default
                    .query(insert_new_db_query_js_1.default, [
                    query_array[i].order_id,
                    query_array[i].order_date,
                    query_array[i].order_status,
                    query_array[i].order_detail_id,
                    query_array[i].order_options,
                    query_array[i].order_option_ids,
                    query_array[i].cust_id,
                    query_array[i].full_name,
                    query_array[i].phone_number,
                    query_array[i].product_name,
                    query_array[i].product_code,
                    query_array[i].product_qt,
                    query_array[i].notes,
                    query_array[i].pallet,
                    query_array[i].tack,
                    query_array[i].assembled,
                    query_array[i].completed,
                    query_array[i].ship_country,
                    query_array[i].ship_state,
                    query_array[i].ship_city,
                    query_array[i].ship_address,
                    query_array[i].ship_postal_code,
                    query_array[i].tracking,
                    query_array[i].payment_amount,
                    query_array[i].payment_method_id,
                ])
                    .catch(err => console.log(err));
                yield (0, timer_js_1.default)(200);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = dupliate;

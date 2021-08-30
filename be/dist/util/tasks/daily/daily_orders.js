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
const db_js_1 = __importDefault(require("../../db.js"));
const logging_js_1 = require("../../logging.js");
const query_filter_js_1 = __importDefault(require("../../../logic/orders/insert/query_filter.js"));
const duplicate_js_1 = __importDefault(require("../../../logic/orders/insert/duplicate.js"));
const volusion_fetch_js_1 = __importDefault(require("../../../logic/general/volusion_fetch.js"));
const insert_orders_query_js_1 = require("../../../sql/orders/insert/insert_orders_query.js");
let order_advance = 55;
let last_order_id = 0;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_js_1.time_stamp)();
    try {
        let { order_id } = yield db_js_1.default
            .query(insert_orders_query_js_1.find_last_order_query)
            .then(res => {
            return res.rows[0];
        })
            .catch(err => console.log(err.stack));
        last_order_id = +order_id + 1;
    }
    catch (error) {
        console.log(error);
    }
    const MainLoop = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data_array = yield (0, volusion_fetch_js_1.default)(id);
            let data_filter = yield (0, query_filter_js_1.default)(data_array);
            yield (0, duplicate_js_1.default)(data_filter);
        }
        catch (err) {
            err;
        }
    });
    function loop() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
                console.log(id);
                yield MainLoop(id);
                yield (0, logging_js_1.timer)(250);
                if (id === last_order_id + order_advance)
                    console.log('insert loop done');
            }
        });
    }
    yield loop();
});

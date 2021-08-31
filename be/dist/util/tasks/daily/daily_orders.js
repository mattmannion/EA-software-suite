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
const logging_js_1 = require("../../logging.js");
const create_order_js_1 = __importDefault(require("../../../logic/orders/insert/create_order.js"));
const find_last_order_js_1 = __importDefault(require("../../../logic/orders/insert/find_last_order.js"));
const order_advance = 55;
let last_order_id = 0;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_js_1.time_stamp)();
    last_order_id = yield (0, find_last_order_js_1.default)(last_order_id);
    function loop() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
                console.log(id);
                yield (0, create_order_js_1.default)(id);
                yield (0, logging_js_1.timer)(250);
                if (id === last_order_id + order_advance)
                    console.log('insert loop done');
            }
        });
    }
    yield loop();
});

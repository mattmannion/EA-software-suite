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
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = __importDefault(require("xml2js"));
const logger_js_1 = __importDefault(require("../../../util/logger.js"));
const timer_js_1 = __importDefault(require("../../../util/timer.js"));
const duplicate_js_1 = __importDefault(require("../logic/insert/duplicate.js"));
const query_filter_js_1 = __importDefault(require("../logic/insert/query_filter.js"));
const order_advance = 7700;
const last_order_id = 106702;
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_js_1.default)(req);
    const MainLoop = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let response = yield (0, node_fetch_1.default)(`${process.env.insert_order_v3}${id}`);
            let { xmldata } = yield xml2js_1.default.parseStringPromise(yield response.text(), (err, res) => {
                if (err)
                    return console.log(err);
                else
                    return res;
            });
            yield (0, duplicate_js_1.default)((0, query_filter_js_1.default)(xmldata.Orders));
        }
        catch (err) {
            return console.log(err);
        }
    });
    res.status(200).json({
        status: 'success',
    });
    function testloop() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(last_order_id);
            yield MainLoop(last_order_id);
        });
    }
    function loop() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
                console.log(id);
                yield MainLoop(id);
                yield (0, timer_js_1.default)(200);
                if (id === last_order_id + order_advance)
                    console.log('insert loop done');
            }
        });
    }
    yield loop();
});

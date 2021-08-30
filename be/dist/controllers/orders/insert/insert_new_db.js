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
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = __importDefault(require("xml2js"));
const logging_js_1 = __importStar(require("../../../util/logging.js"));
const duplicate_js_1 = __importDefault(require("../../../logic/orders/insert/duplicate.js"));
const query_filter_js_1 = __importDefault(require("../../../logic/orders/insert/query_filter.js"));
const order_advance = 7700;
const last_order_id = 106702;
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_js_1.default)(req);
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
                yield (0, logging_js_1.timer)(250);
                if (id === last_order_id + order_advance)
                    console.log('insert loop done');
            }
        });
    }
    yield loop();
});

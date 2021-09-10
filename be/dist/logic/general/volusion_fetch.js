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
const env_1 = require("../../env");
function volusion_fetch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)(`${env_1.vol_url}${id}`);
        let { xmldata } = yield xml2js_1.default
            .parseStringPromise(yield response.text())
            .then((res) => res)
            .catch((err) => console.log(err));
        return xmldata.Orders;
    });
}
exports.default = volusion_fetch;

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
const db_js_1 = __importDefault(require("../../../../util/db.js"));
const logger_js_1 = __importDefault(require("../../../../util/logger.js"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_js_1.default)(req);
    try {
        const { id, o_id, od_id } = req.params;
        const { body } = req.body;
        const data = yield db_js_1.default
            .query(`
        update orders set pallet = $4
        where id = $1 and order_id = $2 and order_detail_id = $3
        returning pallet;
      `, [id, o_id, od_id, body])
            .then(res => res.rows[0])
            .catch(err => console.log(err.stack));
        if (data) {
            res.status(201).json({
                data,
                status: 'updated pallet status',
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

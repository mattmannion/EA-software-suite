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
const db_js_1 = __importDefault(require("../../../db/db.js"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = __importDefault(require("xml2js"));
const logging_js_1 = __importDefault(require("../../../util/logging.js"));
const timer_js_1 = __importDefault(require("../../../util/timer.js"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logging_js_1.default)(req);
    const { id } = req.params;
    try {
        let response = yield (0, node_fetch_1.default)(`${process.env.insert_order_v2}${id}`);
        let { xmldata } = yield xml2js_1.default.parseStringPromise(yield response.text(), { explicitArray: false }, (err, res) => {
            if (err)
                return console.log(err);
            else
                return res;
        });
        let { Orders: data } = xmldata;
        const query = `
        insert into orders (
          order_id,
          order_date,
          order_status,
          order_detail_id,
          order_option,
          order_option_id,
          full_name,
          shipped,
          product_name,
          product_code,
          notes,
          pallet,
          tack,
          assembled,
          completed,
          last_mod
          )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        returning *;
      `;
        if (data === null || data === undefined) {
            res.status(200).json({
                status: 'no data',
            });
            return;
        }
        else if (data !== null || data !== undefined) {
            let { OrderID, OrderDate, OrderStatus, BillingFirstName, BillingLastName, Shipped, } = data;
            const full_name = BillingFirstName + ' ' + BillingLastName;
            const notes = '';
            const pallet = '';
            const tack = '';
            const assembled = '';
            const completed = '';
            const dod = data.OrderDetails;
            if (Shipped === undefined)
                Shipped = 'N';
            OrderDate = OrderDate.split(' ')[0];
            if (Array.isArray(dod)) {
                const queryMap = dod.map(({ OrderDetailID, OptionIDs, Options, ProductName, ProductCode, LastModified, }) => {
                    return [
                        OrderID,
                        OrderDate,
                        OrderStatus,
                        OrderDetailID,
                        Options,
                        OptionIDs,
                        full_name,
                        Shipped,
                        ProductName,
                        ProductCode,
                        notes,
                        pallet,
                        tack,
                        assembled,
                        completed,
                        LastModified,
                    ];
                });
                for (let i = 0; i < queryMap.length; i++) {
                    yield (0, timer_js_1.default)(1000);
                    db_js_1.default.query(query, queryMap[i])
                        .then(res => {
                        return res.rows[0];
                    })
                        .catch(err => console.log(err.stack));
                }
            }
            else {
                const { OrderDetailID, OptionIDs, Options, ProductName, ProductCode, LastModified, } = dod;
                db_js_1.default.query(query, [
                    OrderID,
                    OrderDate,
                    OrderStatus,
                    OrderDetailID,
                    Options,
                    OptionIDs,
                    full_name,
                    Shipped,
                    ProductName,
                    ProductCode,
                    notes,
                    pallet,
                    tack,
                    assembled,
                    completed,
                    LastModified,
                ])
                    .then(res => res.rows[0])
                    .catch(err => console.log(err.stack));
            }
            res.status(200).json({
                status: 'success',
            });
            return;
        }
        else {
            res.status(400).json({
                status: 'something went wrong...',
            });
            return;
        }
    }
    catch (err) {
        err;
    }
});

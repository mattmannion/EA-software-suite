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
exports.dbq = exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
exports.db = new pg_1.default.Pool({ idleTimeoutMillis: 100 });
const dbq = (query, array, rows = null) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array))
        array = [];
    if (rows === null)
        return yield exports.db.query(query, array).catch(err => console.log(err));
    if (rows === false || rows === 0)
        return yield exports.db
            .query(query, array)
            .then(res => res.rows[0])
            .catch(err => console.log(err));
    if (rows === true || rows === 1)
        return yield exports.db
            .query(query, array)
            .then(res => res.rows)
            .catch(err => console.log(err));
});
exports.dbq = dbq;
exports.default = exports.db;

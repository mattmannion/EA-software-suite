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
const db_js_1 = __importDefault(require("../../util/db.js"));
const logger_js_1 = __importDefault(require("../../util/logger.js"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_js_1.default)(req);
    try {
        const { id } = req.params;
        const query = yield db_js_1.default
            .query('select * from users where id = $1', [id])
            .then(res => res.rows[0])
            .catch(err => console.log(err.stack));
        let { first_name, last_name, email, password, username, permissions, confirmed, } = req.body;
        if (!first_name)
            first_name = query.first_name;
        if (!last_name)
            last_name = query.last_name;
        if (!email)
            email = query.email;
        if (!password)
            password = query.password;
        if (!username)
            username = query.username;
        if (!permissions)
            permissions = query.permissions;
        if (!confirmed)
            confirmed = query.confirmed;
        const data = yield db_js_1.default
            .query(`
        update users set first_name = $2, last_name = $3, email = $4, password = $5, username = $6, permissions = $7, confirmed = $8
        where id = $1
        returning *;
      `, [
            id,
            first_name,
            last_name,
            email,
            password,
            username,
            permissions,
            confirmed,
        ])
            .then(res => res.rows[0])
            .catch(err => console.log(err.stack));
        if (data) {
            res.status(201).json({
                data,
                status: 'success',
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

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
const users_queries_1 = require("../../sql/users/users_queries");
const db_1 = __importDefault(require("../../util/db"));
const logging_1 = __importDefault(require("../../util/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function update_one_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logging_1.default)(req);
        try {
            const { id } = req.params;
            const query = yield db_1.default
                .query(users_queries_1.update_one_user_query, [id])
                .then((res) => res.rows[0])
                .catch((err) => console.log(err.stack));
            let { first_name, last_name, email, password, username, permissions, confirmed, } = req.body;
            if (password) {
                password = yield bcryptjs_1.default.hash(password, 12);
            }
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
            const data = yield db_1.default
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
                .then((res) => res.rows[0])
                .catch((err) => console.log(err.stack));
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
}
exports.default = update_one_user;

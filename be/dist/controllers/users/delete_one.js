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
function delete_one_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logging_1.default)(req);
        try {
            const { id } = req.params;
            const data = yield db_1.default
                .query(users_queries_1.delete_one_user_query, [id])
                .then(res => res.rows[0])
                .catch(err => console.log(err.stack));
            if (data) {
                res.status(201).json({
                    data: 'user deleted',
                    status: 'success',
                });
            }
            else {
                res.status(400).json({
                    status: 'failure, no users with that id found',
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = delete_one_user;

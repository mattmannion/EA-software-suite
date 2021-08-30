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
const logging_js_1 = __importDefault(require("../../util/logging.js"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logging_js_1.default)(req);
        try {
            const data = yield db_js_1.default
                .query(`
        select * from users 
        where username=$1 and password=$2;
      `, [req.body.username, req.body.password])
                .then(res => res.rows[0])
                .catch(err => console.log(err.stack));
            if (data)
                res.status(200).json({
                    status: 'logged in',
                    data,
                });
            else
                res.status(204).json({
                    status: 'login failed',
                });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = login;
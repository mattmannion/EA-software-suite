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
const db_1 = __importDefault(require("../../util/db"));
const authentication_queries_1 = require("../../sql/authentication/authentication_queries");
const logging_1 = __importDefault(require("../../util/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logging_1.default)(req);
        try {
            const { body, session } = req;
            const data = yield db_1.default
                .query(authentication_queries_1.login_query, [body.username])
                .then((res) => res.rows[0])
                .catch((err) => console.log(err.stack));
            if (!body.password)
                return;
            const authenticated = yield bcryptjs_1.default.compare(body.password, data.password);
            if (!authenticated)
                return res.status(401).json({
                    status: 'wrong username or password',
                });
            if (session.username || session.permissions)
                return res.status(409).json({
                    status: 'already logged in',
                });
            session.username = data.username;
            session.permissions = [data.permissions];
            return res.status(200).json({
                username: session.username,
                permissions: session.permissions,
                status: 'logged in',
            });
        }
        catch (error) {
            return console.log(error);
        }
    });
}
exports.default = login;

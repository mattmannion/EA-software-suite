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
const logging_1 = __importDefault(require("../../util/logging"));
function login_info(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logging_1.default)(req);
        try {
            let { session } = req;
            const logged_in = session.username && session
                ? 'you are logged in'
                : 'you are not logged in';
            const { username, permissions } = session;
            if (!session.username || !session.permissions) {
                session.destroy(() => {
                    session.cookie.expires = new Date();
                });
            }
            return res.status(200).json({
                username,
                permissions,
                status: logged_in,
            });
        }
        catch (error) {
            return console.log(error);
        }
    });
}
exports.default = login_info;

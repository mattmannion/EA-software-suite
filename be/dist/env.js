"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session_secret = exports.session_age = exports.session_name = exports.whitelist = exports.vol_url = exports.redis_password = exports.redis_host = exports.redis_port = exports.path = exports.port = exports.prod = void 0;
const env = process.env;
exports.prod = env.NODE_ENV === 'prod' ? true : false;
exports.port = exports.prod ? +env.PORT : 7878;
exports.path = exports.prod ? env.URL : 'http://localhost:';
exports.redis_port = exports.prod ? +env.REDIS_PORT : 6379;
exports.redis_host = exports.prod ? env.REDIS_HOST : 'localhost';
exports.redis_password = exports.prod
    ? env.REDIS_PASSWORD
    : undefined;
exports.vol_url = env.insert_order_v3;
const prodlist = new Set([env.WL_1]);
const devlist = new Set(['http://localhost:3000', 'http://localhost:7878']);
exports.whitelist = exports.prod ? prodlist : devlist;
exports.session_name = env.SESSION_NAME;
exports.session_age = +env.SESSION_AGE;
exports.session_secret = env.SESSION_SECRET;
exports.default = env;

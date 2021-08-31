"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vol_url = exports.path = exports.port = exports.prod = void 0;
const env = process.env;
exports.prod = env.NODE_ENV === 'prod' ? true : false;
exports.port = exports.prod ? +env.PORT : 7878;
exports.path = exports.prod ? env.URL : 'http://localhost:';
exports.vol_url = env.insert_order_v3;
exports.default = env;

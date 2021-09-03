"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const env_1 = require("../env");
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisClient = (0, redis_1.createClient)({
    port: env_1.redis_port,
    host: env_1.redis_host,
    password: env_1.redis_password,
});
exports.default = (0, express_session_1.default)({
    store: new RedisStore({ client: redisClient }),
    name: env_1.session_name,
    secret: env_1.session_secret,
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    cookie: {
        secure: env_1.prod,
        httpOnly: true,
        maxAge: env_1.session_age,
    },
});

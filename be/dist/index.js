"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importStar(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const env_1 = require("./env");
const cors_settings_1 = __importDefault(require("./middleware/cors_settings"));
const redis_session_1 = __importDefault(require("./middleware/redis-session"));
const task_driver_1 = __importDefault(require("./util/tasks/task_driver"));
const daily_update_1 = __importDefault(require("./util/tasks/daily/daily_update"));
const daily_orders_1 = __importDefault(require("./util/tasks/daily/daily_orders"));
const app = (0, express_1.default)();
app.use(redis_session_1.default);
app.options('*', cors_settings_1.default);
app.use(cors_settings_1.default);
app.use((0, express_1.json)());
if (env_1.prod) {
    (0, task_driver_1.default)(daily_update_1.default, { second: 0, minute: 0, hour: 17 });
    (0, task_driver_1.default)(daily_orders_1.default, { second: 0, minute: 0, hour: 18 });
}
app.use(...router_1.default);
app.listen(env_1.port, () => console.log(`live @ ${env_1.path + env_1.port}`));

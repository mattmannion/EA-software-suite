"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
const rule = new node_schedule_1.RecurrenceRule();
exports.default = (callback, rules) => {
    let second, minute, hour;
    if (rules !== undefined)
        ({ second, minute, hour } = rules);
    if (!second)
        second = 0;
    if (!minute)
        minute = 0;
    if (!hour)
        hour = 0;
    rule.second = second;
    rule.minute = minute;
    rule.hour = hour;
    rule.tz = 'America/Detroit';
    (0, node_schedule_1.scheduleJob)(rule, () => {
        try {
            callback();
        }
        catch (error) {
            error;
        }
    });
};

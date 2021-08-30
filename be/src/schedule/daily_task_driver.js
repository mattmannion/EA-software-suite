import { scheduleJob, RecurrenceRule } from 'node-schedule';

const rule = new RecurrenceRule();

export default (callback, rules) => {
  let second, minute, hour;

  if (rules !== undefined) ({ second, minute, hour } = rules);

  if (!second) second = 0;
  if (!minute) minute = null;
  if (!hour) hour = null;

  rule.second = second;
  rule.minute = minute;
  rule.hour = hour;
  rule.tz = 'America/Detroit';

  scheduleJob(rule, () => {
    try {
      callback();
    } catch (error) {
      error;
    }
  });
};

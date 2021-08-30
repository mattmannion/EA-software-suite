import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { rules } from '../../../types/schedule/tasks/daily_task_driver';

const rule = new RecurrenceRule();

export default (callback: any, rules: rules) => {
  let second: number | undefined,
    minute: number | undefined,
    hour: number | undefined;

  if (rules !== undefined) ({ second, minute, hour } = rules);

  if (!second) second = 0;
  if (!minute) minute = 0;
  if (!hour) hour = 0;

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

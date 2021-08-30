import { Request } from 'express';

export const timer = (sec: number) => new Promise(res => setTimeout(res, sec));

export const time_stamp = () => {
  const date = new Date();
  console.log(
    `task started at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};

const logger = (req: Request) => {
  const date = new Date();
  console.log(
    `${req.path} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};

export default logger;

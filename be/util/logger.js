export const time_stamp = () => {
  const date = new Date();
  console.log(
    `task started at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};

const logger = req => {
  const date = new Date();
  console.log(
    `${req.path} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};

export default logger;

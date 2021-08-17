const logger = req => {
  const date = new Date();
  console.log(
    `${req.path} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};

export default logger;
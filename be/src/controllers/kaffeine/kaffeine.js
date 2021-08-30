import logger from '../../util/logging.js';

export default async (req, res) => {
  logger(req);

  try {
    res.status(200).send({
      status: 'app woken up',
    });
  } catch (error) {
    console.log(error);
  }
};

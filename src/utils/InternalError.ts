import logger from '../config/winston';

export default (msg: string) => {
  logger.error(msg);
  process.exit(1);
};

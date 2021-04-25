import winston, { format } from 'winston';
import { upperCase } from 'lodash';

const { combine, timestamp: timeStampFormat, printf } = format;

const errorStackFormat = format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      stack: info.stack,
      message: info.message,
    };
  }
  return info;
});

const customFormat = printf(
  ({ level, message, timestamp, stack, label }: any) => {
    const errStack = stack ? `\n${stack}` : '';
    const labelTag = label ? ` [${label}] ` : ' ';

    return `${timestamp}${labelTag}- ${upperCase(level)}: ${JSON.stringify(
      message
    )} ${errStack}`;
  }
);

const options: winston.LoggerOptions = {
  format: combine(timeStampFormat(), errorStackFormat(), customFormat),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);
logger.debug('Logging initialized at debug level');

export default logger;

import { createLogger, format, transports } from 'winston';

// @types/winston hasn't been upgraded yet to support winston 3.0
// https://github.com/winstonjs/winston/issues/1190
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20418
class Logger {
  private logger: any;

  constructor(scope: string) {
    const { colorize, combine, label, printf, timestamp } = format;

    this.logger = createLogger({
      format: combine(
        label({ label: scope }),
        timestamp(),
        colorize(),
        printf(this.format),
      ),
      transports: [
        new transports.Console({
          humanReadableUnhandledException: true,
          handleExceptions: true,
        }),
      ],
    });

  }

  format = (info: any) : string => {
    const { label, level, message, timestamp } = info;

    return `${timestamp} [${label}] ${level}: ${message}`;
  }

  error = (message: string) : string => (
    this.logger.error(message)
  )

  info = (message: string) : string =>  (
    this.logger.info(message)
  )
}

export default (scope: string): any => (
  new Logger(scope)
);

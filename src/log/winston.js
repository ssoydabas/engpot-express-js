import { createLogger, format, transports } from "winston";

const { combine, timestamp, json, errors, printf } = format;

const computerReadableLog = createLogger({
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    // new transports.Console({ level: "info" }),
    new transports.File({
      level: "error",
      filename: "src/log/logs/error.log",
    }),
  ],
});

const humanReadableLog = createLogger({
  format: combine(
    timestamp(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: "src/log/logs/error_human.log" }),
  ],
});

const logErrors = (error) => {
  computerReadableLog.error(error);
  humanReadableLog.error(error);
};

export default logErrors;

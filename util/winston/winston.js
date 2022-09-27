import { createLogger, format, transports } from "winston";

const { combine, timestamp, json, colorize, printf, label, errors } = format;

import UserActivity from "../../models/logModels/userActivity.js";

import mongoose from "mongoose";

const timestampFormat = { format: "MM-DD-YY HH:MM:SS" };

const consoleLogger = createLogger({
  transports: [
    new transports.Console({
      level: "warn",
      format: combine(
        timestamp(timestampFormat),
        label({
          label: "CONSOLE WARNING",
        }),
        colorize({ all: true, colors: { warn: "yellow" } }),
        printf((info) => {
          return `${info.label}: TIME: ${info.timestamp} - MESSAGE: ${info.message}`;
        })
      ),
    }),
  ],
});
const consoleLog = (message) => {
  return consoleLogger.warn(message);
};

const userActivityLogger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      format: combine(
        timestamp(timestampFormat),
        label({
          label: "USER ACTIVITY",
        }),
        json()
      ),
      filename: "winston/userActivity.log",
    }),
  ],
});
const userActivityLog = async (topic, sides, message) => {
  // * sides: {
  // *     from: {
  // *         email:email,
  // *         id: id
  // *     },
  // *     to: {
  // *         email:email,
  // *         id: id
  // *     }
  // * };

  const userActivity = new UserActivity({
    topic: topic,
    from: {
      email: sides.from ? sides.from.email : null,
      id: sides.from ? mongoose.Types.ObjectId(sides.from.id) : null,
    },
    to: {
      email: sides.to.email,
      id: mongoose.Types.ObjectId(sides.to.id),
    },
    message: message,
  });
  await userActivity.save();

  return userActivityLogger.log({
    level: "info",
    message: `From: ${sides.from ? sides.from.email : null} to ${
      sides.to.email
    } - ${message}`,
  });
};

const errorLogger = createLogger({
  transports: [
    new transports.File({
      level: "error",
      format: combine(
        errors({ stack: true }),
        timestamp(timestampFormat),
        json()
      ),
      filename: "winston/error.log",
    }),
  ],
});
const errorLog = (message) => {
  return errorLogger.error(message);
};

const winston = {
  consoleLog,
  userActivityLog,
  errorLog,
};

export default winston;

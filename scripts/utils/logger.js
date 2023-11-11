const winston = require('winston');

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'http';
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[32m',
  http: '\x1b[35m',
  debug: '\x1b[37m',
  gray: '\x1b[90m',
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
// winston.addColors(colors);

function pad(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

function syntaxHighlight(jsonString) {
  const json = jsonString.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let color = colors.warn;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        color = colors.reset;
      } else {
        color = colors.info;
      }
    } else if (/true|false/.test(match)) {
      color = colors.debug;
    } else if (/null/.test(match)) {
      color = colors.http;
    }
    return color + match + colors.reset;
  });
}

module.exports = ({ name }) => {
// Chose the aspect of your log customizing the log format.
  const format = winston.format.combine(
    winston.format.timestamp({
      format: () => {
        const date = new Date();
        return `${date.getUTCFullYear()
        }-${pad(date.getUTCMonth() + 1)
        }-${pad(date.getUTCDate())
        }T${pad(date.getUTCHours())
        }:${pad(date.getUTCMinutes())
        }:${pad(date.getUTCSeconds())}`;
      },
    }),
    winston.format.printf((info) => {
      const pre = `${colors[info.level]}${info.level.toUpperCase()}${colors.reset} [${info.timestamp}] ${colors.gray}(${name})${colors.reset}:`;
      let after = '';

      if (info.stack) {
        after += `\n${info.stack}`;
      }
      try {
        if (info.json) {
          after += `\n${syntaxHighlight(JSON.stringify(info.json, null, 2))}`;
        }
      } catch (e) {
      }
      if (info.lines) {
        after += `\n  ${info.lines.join('\n  ')}`;
      }
      return `${pre} ${info.message}${after}`;
    }),
  );

  // Define which transports the logger must use to print out messages.
  // In this example, we are using three different transports
  const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    // new winston.transports.File({
    //   filename: 'logs/error.log',
    //   level: 'error',
    // }),
    // Allow to print all the error message inside the all.log file
    // (also the error log that are also printed inside the error.log(
    // new winston.transports.File({ filename: 'logs/all.log' }),
  ];

  // Create the logger instance that has to be exported
  // and used to log messages.
  return winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
  });
};

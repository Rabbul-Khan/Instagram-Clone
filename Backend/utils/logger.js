// This utility separates printing to the console from other code.

// For printing normal log messages
const info = (...params) => {
  // If we are testing, we prevent the log messages from printing to the console.
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

// For printing error log messages
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};

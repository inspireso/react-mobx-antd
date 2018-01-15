/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

let log = {};
log.trace = function () {
};

log.debug = function () {
};

log.info = function (msg) {
  console.info(msg);
};

log.warn = function (msg) {
  console.warn(msg);
};

log.error = function (msg) {
  console.error(msg);
};

if (process.env.NODE_ENV !== 'production') {
  log.trace = function (msg) {
    console.trace(msg);
  };
  log.debug = function (msg) {
    console.log(msg);
  }
}

export {log};
export default log.debug;

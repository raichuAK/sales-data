function functionDecorator(fn) {
  return function (message) {
    fn.call(this, message);
  };
}

function isDebugEnabled() {
  return process.env.debugFlag;
}

function logger(message) {
  if (isDebugEnabled()) {
    console.log(message);
  }
}

const debugLog = functionDecorator(logger);

export default debugLog;

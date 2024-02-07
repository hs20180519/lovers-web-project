const logger = require("../config/logger");

function errorLogger(error, req, res, next) {
  if (error.status) res.status(error.status).send(error.message);
  else res.status(500).json(error.stack);

  const stackLines = error.stack ? error.stack.split("\n") : [];
  const truncatedStack = stackLines.slice(0, 5).join("\n");
  const reqBodyString = JSON.stringify(req.body);
  logger.error(
    ` ❌ [${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
  );
  next();
}

module.exports = errorLogger;

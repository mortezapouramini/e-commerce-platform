const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const filePath = path.join(__dirname, "../logs/logs.ndjson");
  const log = {
    time: new Date().toISOString(),
    method: req.method,
    path: req.path,
    headers: {
      authorization: req.headers.authorization,
      "user-agent": req.headers["user-agent"],
      "content-type": req.headers["content-type"],
      host: req.headers.host,
      origin: req.headers.origin,
      referer: req.headers.referer,
    },
    query: req.query || {},
    params: req.params || {},
    body: req.body || {},
    cookies: req.cookies || {},
  };

  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(filePath, JSON.stringify(log, null, 2) + "\n");
  next();
};

module.exports = logger;

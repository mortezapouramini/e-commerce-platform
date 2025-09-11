const createError = (status = 500, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const createResponse = (status = 200, details = "ok") => {
  const response = {
    status,
    details,
  };
  return response;
};

module.exports = { createError, createResponse };

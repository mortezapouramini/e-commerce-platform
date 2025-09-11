const responseHandler = (response, res) => {
  res.status(response.status || 200).json({
    success: true,
    details: response.details,
  });
};

const errorHandler = (err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).json({
      success: false,
      details: "CSRF Token mismatch!",
    });
  } else {
    res.status(err.status || 500).json({
      success: false,
      details: err.message || "Internal server error",
    });
  }
};

module.exports = { responseHandler, errorHandler };

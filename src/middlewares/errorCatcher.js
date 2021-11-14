// error handler
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // render the error page
  const httpCode = err.status || 500;
  const errorMsg = err.message;

  res.status(httpCode);

  res.json({ success: false, msg: errorMsg });
};

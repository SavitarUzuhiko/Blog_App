const errorMiddleware = (error , req , res , next) => {
  const statusCode = error.status || 500;
  const msg = error.message || "Something went wrong";
  res.status(statusCode).json({success : false , msg});
  next();
}

module.exports = {errorMiddleware};
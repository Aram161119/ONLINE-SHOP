class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

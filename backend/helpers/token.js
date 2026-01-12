const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");

module.exports = {
  verify: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new ApiError("Unauthorized", 401);
    }
  },
  generate: (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
  },
};

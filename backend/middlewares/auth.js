const User = require("../models/User");
const { verify } = require("../helpers/token");
const ApiError = require("../errors/ApiError");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    throw new ApiError("Unauthorized", 401);
  }

  const tokenData = verify(req.cookies.token);
  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    throw new ApiError("Unauthorized", 401);
  }

  req.user = user;
  next();
};

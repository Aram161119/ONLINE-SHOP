const { create } = require("../models/Cart");

module.exports = function (user) {
  return {
    id: user._id?.toString(),
    email: user.email,
    roleId: user.role,
    createdAt: user.createdAt,
  };
};

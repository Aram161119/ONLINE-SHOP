const { ROOT } = require("../constants/roles");

module.exports = function (roles) {
  return (req, res, next) => {
    if (req?.user?.role === ROOT) {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      res.status(500).json({ error: "Access denied!" });

      return;
    }

    next();
  };
};

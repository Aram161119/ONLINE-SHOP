const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/users", require("./user"));
router.use("/products", require("./product"));
router.use("/categories", require("./category"));
router.use("/cart", require("./cart"));

module.exports = router;

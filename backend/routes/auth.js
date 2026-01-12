const express = require("express");

const mapUser = require("../mappers/mapUser");
const { login, register } = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  const { token, user } = await register(req.body.email, req.body.password);

  res
    .cookie("token", token, { httpOnly: true })
    .json({ error: null, user: mapUser(user) });
});

router.post("/login", async (req, res) => {
  const { user, token } = await login(req.body.email, req.body.password);

  res
    .cookie("token", token, { httpOnly: true })
    .json({ error: null, user: mapUser(user) });
});

router.post("/logout", auth, async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).json({});
});

module.exports = router;

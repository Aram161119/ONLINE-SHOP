const express = require("express");
const mapUser = require("../mappers/mapUser");
const auth = require("../middlewares/auth");
const roles = require("../constants/roles");
const hasRole = require("../middlewares/hasRole");
const {
  getUsers,
  updateUserRole,
  deleteUser,
  getRoles,
} = require("../controllers/user");
const prepareQuery = require("../helpers/prepareQuery");

const router = express.Router({ mergeParams: true });

router.get("/", auth, hasRole([roles.ADMIN]), async (req, res) => {
  const { query, sortObj, skip, limit } = prepareQuery(req.query);

  const { users, lastPage } = await getUsers(query, sortObj, skip, limit);

  res
    .status(200)
    .json({ data: { users: users.map(mapUser), lastPage }, error: null });
});

router.patch("/:id", auth, hasRole([roles.ROOT]), async (req, res) => {
  const updatedUser = await updateUserRole(req.params.id, req.body.roleId);

  res.status(200).json({ data: mapUser(updatedUser), error: null });
});

router.delete("/:id", auth, hasRole([roles.ROOT]), async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).json({ error: null });
});

router.get("/roles", auth, hasRole([roles.ADMIN]), (req, res) => {
  const roles = getRoles();
  res.status(200).json({ data: roles, error: null });
});

module.exports = router;

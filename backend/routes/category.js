const express = require("express");
const mapCategory = require("../mappers/mapCategory");
const auth = require("../middlewares/auth");
const hasRole = require("../middlewares/hasRole");
const roles = require("../constants/roles");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const prepareQuery = require("../helpers/prepareQuery");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { query, sortObj, skip, limit = 100 } = prepareQuery(req.query);

  const categories = await getCategories(query, sortObj, skip, limit);

  res.status(200).json({
    data: categories.map(mapCategory),
    error: null,
  });
});

router.get("/:id", auth, async (req, res) => {
  const category = await getCategory(req.params.id);

  res.status(200).json({ data: mapCategory(category), error: null });
});

router.post("/", auth, hasRole([roles.ADMIN]), async (req, res) => {
  const newCategory = await addCategory(req.body);

  res.status(201).json({ data: mapCategory(newCategory), error: null });
});

router.put("/:id", auth, hasRole([roles.ADMIN]), async (req, res) => {
  const updatedCategory = await updateCategory(req.params.id, req.body);

  res.status(200).json({ data: mapCategory(updatedCategory), error: null });
});

router.delete("/:id", auth, hasRole([roles.ADMIN]), async (req, res) => {
  await deleteCategory(req.params.id);

  res.status(204).json({ error: null });
});

module.exports = router;

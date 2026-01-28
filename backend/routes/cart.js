const express = require("express");
const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  deleteItemFromCart,
} = require("../controllers/cart");
const auth = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  const cart = await getCart(req.user.id);

  res.status(200).json({ data: cart, error: null });
});

router.post("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await addItemToCart(req.user.id, productId, quantity);

  res.status(201).json({ data: cart, error: null });
});

router.put("/items/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await updateItemQuantity(req.user.id, productId, quantity);

  res.status(200).json({ data: cart, error: null });
});

router.delete("/items/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  const cart = await deleteItemFromCart(req.user.id, productId);

  res.status(204).json({ data: cart, error: null });
});

module.exports = router;

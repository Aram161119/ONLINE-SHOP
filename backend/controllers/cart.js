const Cart = require("../models/Cart");
const mapCart = require("../mappers/mapCart");
const ApiError = require("../errors/ApiError");
const Product = require("../models/Product");

async function getCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "title price image"
  );

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return mapCart(cart);
}

async function addItemToCart(userId, productId, quantity = 1) {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const product = await getProductOrThrow(productId);

  const updatedCart = await cart.addItem(productId, quantity, product.price);

  return mapCart(
    await Cart.findById(updatedCart._id).populate(
      "items.product",
      "title price image"
    )
  );
}

async function updateItemQuantity(userId, productId, quantity) {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  await getProductOrThrow(productId);

  const updatedCart = await cart.updateItemQuantity(productId, quantity);

  return mapCart(
    await Cart.findById(updatedCart._id).populate(
      "items.product",
      "title price image"
    )
  );
}

async function deleteItemFromCart(userId, productId) {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new ApiError("Cart not found", 404);

  await getProductOrThrow(productId);

  const updatedCart = await cart.removeItem(productId);

  return mapCart(
    await Cart.findById(updatedCart._id).populate(
      "items.product",
      "title price image"
    )
  );
}

async function getProductOrThrow(productId) {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError("Product not found", 404);
  return product;
}

module.exports = {
  getCart,
  addItemToCart,
  updateItemQuantity,
  deleteItemFromCart,
};

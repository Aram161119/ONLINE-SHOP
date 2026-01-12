const Like = require("../models/Like");
const Product = require("../models/Product");

async function addLike(productId, userId) {
  const newLike = await Like.create({ product: productId, user: userId });

  await Product.findByIdAndUpdate(productId, {
    $push: { likes: newLike._id },
  });

  return await newLike.populate("user");
}

async function deleteLike(likeId, productId) {
  await Like.deleteOne({ _id: likeId });
  await Product.findByIdAndUpdate(productId, {
    $pull: { likes: likeId },
  });
}

async function findOne(productId, userId) {
  return await Like.findOne({ product: productId, user: userId });
}

module.exports = {
  addLike,
  deleteLike,
  findOne,
};

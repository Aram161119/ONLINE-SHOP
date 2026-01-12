const Comment = require("../models/Comment");
const Product = require("../models/Product");

async function addComment(productId, comment) {
  const newComment = await Comment.create({
    ...comment,
    product: productId,
  });

  await Product.findByIdAndUpdate(productId, {
    $push: { comments: newComment._id },
  });

  return await newComment.populate("author");
}

async function deleteComment(commentId, productId, userId) {
  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    author: userId,
  });

  if (!deletedComment) {
    throw new Error("Permission denied!");
  }

  await Product.findByIdAndUpdate(productId, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  addComment,
  deleteComment,
};

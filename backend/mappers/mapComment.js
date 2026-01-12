module.exports = function (comment) {
  return {
    id: comment._id?.toString(),
    text: comment.text,
    author: comment.author?.email || null,
    product: comment.product?.title || null,
    createdAt: comment.createdAt,
  };
};

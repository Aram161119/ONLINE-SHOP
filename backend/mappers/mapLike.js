module.exports = function (like) {
  return {
    id: like._id?.toString(),
    user: like.user?.email || null,
    product: like.product?.title || null,
  };
};

module.exports = function mapCart(cart) {
  if (!cart) return null;

  return {
    id: cart._id?.toString(),
    items: cart.items.map((item) => ({
      id: item.product?._id?.toString() || item.product?.toString(),
      product: item.product?._id
        ? {
            id: item.product._id.toString(),
            title: item.product.title,
            price: item.product.price,
            image: item.product.image,
          }
        : null,
      quantity: item.quantity,
      price: item.price,
    })),
    totalPrice: cart.totalPrice,
    totalQuantity: cart.totalQuantity,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};

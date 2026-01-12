const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

CartSchema.pre("save", function () {
  this.recalculateTotals();
});

CartSchema.methods.recalculateTotals = function () {
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
};

CartSchema.methods.addItem = function (productId, quantity = 1, price) {
  if (!productId || quantity <= 0 || price < 0) {
    throw new Error("Invalid cart item data");
  }

  const existingItemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItemIndex !== -1) {
    this.items[existingItemIndex].quantity += quantity;
  } else {
    this.items.push({
      product: productId,
      quantity,
      price,
    });
  }

  return this.save();
};

CartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );
  return this.save();
};

CartSchema.methods.updateItemQuantity = function (productId, quantity) {
  const item = this.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      return this.removeItem(productId);
    }

    item.quantity = quantity;
    return this.save();
  }

  return Promise.resolve(this);
};

CartSchema.virtual("isEmpty").get(function () {
  return this.items.length === 0;
});

CartSchema.set("toJSON", { virtuals: true });
CartSchema.set("toObject", { virtuals: true });

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;

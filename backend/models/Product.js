const mongoose = require("mongoose");
const { PRICE_RANGE } = require("../constants/products");

const ProductScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    characters: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: PRICE_RANGE.min,
      max: PRICE_RANGE.max,
    },
    image: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductScheme);

module.exports = Product;

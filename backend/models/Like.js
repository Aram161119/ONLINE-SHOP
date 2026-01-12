const mongoose = require("mongoose");

const LikeScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

LikeScheme.index({ user: 1, product: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeScheme);

module.exports = Like;

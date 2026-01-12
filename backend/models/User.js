const mongoose = require("mongoose");
const roles = require("../constants/roles");
const bcrypt = require("bcrypt");

const UserScheme = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role: {
      type: Number,
      enum: [roles.USER, roles.ADMIN, roles.ROOT],
      default: roles.USER,
    },
  },
  { timestamps: true }
);

UserScheme.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserScheme.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserScheme);

module.exports = User;

const User = require("../models/User");
const { generate } = require("../helpers/token");
const { ROLES, ROOT, ADMIN, USER } = require("../constants/roles");
const ApiError = require("../errors/ApiError");
const buildAggregation = require("../builders/buildAggregation");
const buildComputedSort = require("../builders/buildComputedSort");

async function register(email, password) {
  if (!password) {
    throw new ApiError("Password is empty!", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError("Email already exists!", 400);
  }

  const newUser = await User.create({ email, password });
  const token = generate({ id: newUser._id });

  return { token, user: newUser };
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("User does not exist!", 404);
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError("Invalid password!", 401);
  }

  const token = generate({ id: user._id });
  return { user, token };
}

async function getUsers(query, sortObj, skip, limit = 9) {
  const countPromise = User.countDocuments(query);

  const { addFields, sortStage } = buildComputedSort(sortObj);

  const needsAggregation =
    Object.keys(addFields).length > 0 ||
    Object.keys(query).some((key) => key.includes("."));

  if (needsAggregation) {
    const pipeline = buildAggregation({
      query,
      addFields,
      sortStage,
      skip,
      limit,
      lookups: LOOKUPS,
    });

    usersPromise = User.aggregate(pipeline);
  } else {
    usersPromise = User.find(query).sort(sortObj).skip(skip).limit(limit);
  }

  const [users, count] = await Promise.all([usersPromise, countPromise]);

  return {
    users,
    lastPage: Math.ceil(count / limit),
  };
}

function getRoles() {
  return [
    { id: ROOT, name: "Root" },
    { id: ADMIN, name: "Admin" },
    { id: USER, name: "User" },
  ];
}

async function deleteUser(id) {
  const user = await User.findById(id);

  if (!user) throw new ApiError("User not found!", 404);

  if (user.role === ROOT) throw new ApiError("Cannot modify ROOT user!", 403);

  return await user.deleteOne();
}

async function updateUserRole(id, role) {
  if (role === ROOT) {
    throw new ApiError("Cannot assign ROOT role!", 403);
  }

  const user = await User.findById(id);

  if (!user) throw new ApiError("User not found!", 404);

  if (user.role === ROOT) throw new ApiError("Cannot modify ROOT user!", 403);

  if (!ROLES.includes(role)) throw new ApiError("Invalid role value!", 403);

  user.role = role;
  return await user.save();
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUserRole,
};

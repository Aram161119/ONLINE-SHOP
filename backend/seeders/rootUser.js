const User = require("../models/User");
const roles = require("../constants/roles");

const createRootUser = async () => {
  const rootEmail = process.env.ROOT_EMAIL;
  const rootPassword = process.env.ROOT_PASSWORD;

  if (!rootEmail || !rootPassword) {
    throw new Error(
      "ROOT_EMAIL or ROOT_PASSWORD is not defined in environment variables"
    );
  }

  const exists = await User.findOne({ role: roles.ROOT });

  if (exists) {
    console.log("Root user already exists");
    return;
  }

  await User.create({
    email: rootEmail,
    password: rootPassword,
    role: roles.ROOT,
    isActive: true,
  });

  console.log("Root user successfully created");
};

module.exports = createRootUser;

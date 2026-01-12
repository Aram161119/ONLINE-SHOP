require("dotenv").config();

const createRootUser = require("./seeders/rootUser.js");
const connectDB = require("./db");

(async () => {
  try {
    await connectDB();
    await createRootUser();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

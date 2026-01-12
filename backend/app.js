require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const autoAsyncHandler = require("./handlers/autoAsyncHandler");
const port = process.env.PORT;
const app = express();
const connectDB = require("./db");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.disable("etag");

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/uploads", express.static("uploads"));

app.use("/", autoAsyncHandler(routes));

app.use(errorHandler);

(async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("Server started on port " + port);
    });
  } catch (error) {
    console.log("DB connection error::", err);
    process.exit(1);
  }
})();

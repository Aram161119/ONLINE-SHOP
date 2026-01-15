require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const autoAsyncHandler = require("./handlers/autoAsyncHandler");
const connectDB = require("./db");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.disable("x-powered-by");
app.disable("etag");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    env: NODE_ENV,
  });
});

app.use("/", autoAsyncHandler(routes));

app.use(errorHandler);

(async function startServer() {
  try {
    await connectDB();
    console.log("Database connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (${NODE_ENV})`);
    });

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    function shutdown() {
      console.log("Shutting down server...");

      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    }
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
})();

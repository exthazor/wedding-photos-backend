import express from "express";
import cors from "cors";
import config from "./config/env.mjs";
import router from "./route/photo.route.mjs";
import errorHandler from "./middleware/error/errorHandler.mjs";
import notFoundHandler from "./middleware/error/notFoundHandler.mjs";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

const allowedOrigins = config.cors.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

import path from "path";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV.trim() === "development") {
  dotenv.config({ path: path.join(__dirname, "env", "development", ".env") });
} else if (process.env.NODE_ENV.trim() === "production") {
  dotenv.config({ path: path.join(__dirname, "env", "production", ".env") });
}

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";

import setHeaders from "./util/setHeaders.js";

import v1Router from "./v1/routes/util/routesBundler.js";

import errorHandler from "./v1/routes/util/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(bodyParser.json());
app.use(setHeaders);

app.use("/v1/user", v1Router.userRouter);
app.use("/v1/admin", v1Router.adminRouter);
app.use("/v1/student", v1Router.studentRouter);
app.use("/v1/teacher", v1Router.teacherRouter);
app.use("/v1/schedule", v1Router.scheduleRouter);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT);
  console.log(`Listening on port: ${PORT}`);
});

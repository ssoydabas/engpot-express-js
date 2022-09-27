import path from "path";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import setHeaders from "./util/engpot_api/setHeaders.js";
import connectDatabase from "./util/engpot_api/connectDatabase.js";
import routes from "./routes/routeBundler.js";

import helmet from "helmet";
// import express-compression from "express-compression";

// import mongoDbBackUp from "";
// import userReminders from "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV.trim() === "development") {
  dotenv.config({ path: path.join(__dirname, "env", "dev", ".env") });
} else if (process.env.NODE_ENV.trim() === "production") {
  dotenv.config({ path: path.join(__dirname, "env", "prod", ".env") });
}

const app = express();
app.use(helmet());

app.use(bodyParser.json());

app.use(setHeaders);

app.use(routes.adminRoutes);
app.use(routes.authRoutes);
app.use(routes.studentRoutes);
app.use(routes.teacherRoutes);
app.use(routes.errorRoutes);

connectDatabase(app);

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
// import materialRoutes from "./routes/materialRoutes.js";
import errorRoutes from "./routes/errorRoutes.js";

const routes = {
  authRoutes,
  userRoutes,
  adminRoutes,
  teacherRoutes,
  studentRoutes,
  scheduleRoutes,
  // materialRoutes,
  errorRoutes,
};

export default routes;

import { Router } from "express";
import { userRoutes } from "./routes/user.route";
import { companyRoutes } from "./routes/company.route";
import { taskRoutes } from "./routes/task.route";
import { companyRequesterRoutes } from "./routes/companyRequester.route";
import { companyUserRoutes } from "./routes/companyUser.route";
import { companyUserRoleRoutes } from "./routes/companyUserRole.route";
import { companyTaskCategoryRoutes } from "./routes/companyTaskCategory.route";
import { roleRoutes } from "./routes/role.route";
import { authRoutes } from "./routes/auth.route";

export const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello world");
});

routes.use("/users", userRoutes);
routes.use("/company", companyRoutes);
routes.use("/companyUser", companyUserRoutes);
routes.use("/companyUserRole", companyUserRoleRoutes);
routes.use("/companyRequester", companyRequesterRoutes);
routes.use("/companyTaskCategory", companyTaskCategoryRoutes);
routes.use("/task", taskRoutes);
routes.use("/role", roleRoutes);
routes.use("/auth", authRoutes);

import { Router } from "express";
import { userRoutes } from "./routes/user.route";
import { companyRoutes } from "./routes/company.route";

export const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello world");
});

routes.use("/users", userRoutes);
routes.use("/company", companyRoutes);

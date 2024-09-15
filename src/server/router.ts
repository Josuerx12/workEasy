import { Router } from "express";
import { userRoutes } from "./routes/user.route";

export const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello world");
});

routes.use("/users", userRoutes);

import UserRoute from "./user.route";
import { Router } from "express";
import ClassRoute from "./class.route";

export default () => {
  const userRoute = new UserRoute();
  const classRoute = new ClassRoute();
  const app = Router();

  //   app.use("/auth", authRoute());
  app.use("/user", userRoute.route);
  app.use("/class", classRoute.route);
  return app;
};

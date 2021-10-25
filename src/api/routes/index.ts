import UserRoute from "./user.route";
import { Router } from "express";
import ClassRoute from "./class.route";
import { Container } from "inversify";

export default (myContainer: Container) => {
  // const userRoute = new UserRoute();
  const classRoute = new ClassRoute(myContainer);
  const app = Router();

  //   app.use("/auth", authRoute());
  // app.use("/user", userRoute.route);
  app.use("/class", classRoute.route);
  return app;
};

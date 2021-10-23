import ClassService from "@/services/class.service";
import { Container } from "typedi";
import LoggerInstance from "./logger";

export default async ({
  mongoConnection,
  models,
}: {
  mongoConnection: any;
  models: { name: string; model: any }[];
}) => {
  models.forEach((model) => {
    Container.set(model.name, model.model);
  });
  // const classService = {name: "classService", model: new ClassService()}
  // Container.set(classService.name, classService.model);

  LoggerInstance.info("✌️ Agenda injected into container");
};

import { Router } from "express";
import { categoryRoutes } from "./categoryRoutes";

const routes = Router()

routes.use("/category",categoryRoutes);

export { routes }
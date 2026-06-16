import { Router } from "express";
import { ProductsRoute } from "./products/product.route";

export class AppRoutes {
  static get route(): Router {
    const route = Router();

    route.use("/products", ProductsRoute.route);

    return route;
  }
}

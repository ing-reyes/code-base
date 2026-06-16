import { Router } from "express";
import { ProductsService } from "./product.service";
import { ProductsController } from "./product.controller";

export class ProductsRoute {
    static get route(): Router{
        const router = Router();

        const productsService = new ProductsService();
        const productsController = new ProductsController(productsService);

        router.post("/", productsController.create);
        router.get("/", productsController.findAll);
        router.get("/:id", productsController.findOne);
        router.put("/:id", productsController.update);
        router.delete("/:id", productsController.delete);

        return router;
    }
}
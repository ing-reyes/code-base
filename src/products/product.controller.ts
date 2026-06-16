import { Request, Response } from "express";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.productsService.create(createProductDto!)
            .then((product) => res.status(201).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    update = (req: Request, res: Response) => {
        const [error, updateProductDto] = UpdateProductDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.productsService.update(req.params.id as string, updateProductDto!)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validate(req.query);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }
        this.productsService.findAll(paginationDto!)
            .then((products) => res.status(200).json(products))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findOne = (req: Request, res: Response) => {

        this.productsService.findOne(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    delete = (req: Request, res: Response) => {

        this.productsService.delete(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}
